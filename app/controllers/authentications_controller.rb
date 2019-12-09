class AuthenticationsController < ApplicationController
  def index
    @authentication = Authentication.new
  end

  def create
    @authentication = Authentication.new
    @authentication.username = authentication_params[:username]
    @authentication.room_uuid = authentication_params[:room_uuid]
    @authentication.uuid = SecureRandom.uuid

    room_uuid = authentication_params[:room_uuid]
    @room = Room.find_by_uuid(room_uuid)

    if @room
      if @room.password_digest
        unless @room.authenticate(authentication_params[:password])
          send_failed_login_broadcast
          redirect_to authenticate_path(room_uuid)
          return
        end
      end

      generate_authentication_token

      if @authentication.save
        set_authentication_cookie
        redirect_to room_path(room_uuid)
      else
        send_failed_login_broadcast
        redirect_to authenticate_path(room_uuid)
      end
    end
  end

  private

  def send_failed_login_broadcast
    ChatChannel.broadcast_to @room,
      type: "server",
      uuid: @room.uuid,
      content: "Someone attempted to join the room but failed.",
      timestamp: Time.now
  end

  def generate_authentication_token
    @authentication.token = SecureRandom.base64
  end

  def set_authentication_cookie
    cookies.encrypted[:authentication_token] = @authentication.token
  end

  def authentication_params
    params.require(:authentication).permit(:username, :password, :room_uuid)
  end
end

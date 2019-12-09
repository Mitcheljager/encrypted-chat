class MessagesController < ApplicationController
  def create
    return if message_params[:content].empty?

    @room = Room.find_by_uuid(message_params[:room_uuid])
    @token = Authentication.find_by_token(cookies.encrypted[:authentication_token])
    username = @token.username

    set_user_color

    ChatChannel.broadcast_to @room,
      uuid: message_params[:room_uuid],
      content: message_params[:content],
      username: username,
      color: @color,
      timestamp: Time.now
  end

  private

  def set_user_color
    srand(@token.id)
    @color = "hsl(#{rand() * 360}, #{55 + (70 * rand())}%, #{50 + (10 * rand())}%)"
  end

  def message_params
    params.require(:message).permit(:content, :room_uuid)
  end
end

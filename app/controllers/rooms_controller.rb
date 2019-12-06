class RoomsController < ApplicationController
  before_action :set_room, only: [:show, :does_room_exist, :authenticate]
  before_action :does_room_exist, only: [:show]
  before_action :authenticate, only: [:show]
  before_action :set_room_cookie, only: [:show]

  def index
    @room = Room.new
  end

  def show
  end

  def create
    @room = Room.new(room_params)
    @room.uuid = SecureRandom.uuid

    if @room.save
      redirect_to room_path(@room.uuid)
    else
      redirect_to root_path
    end
  end

  private

  def set_room
    @room = Room.find_by_uuid(params[:uuid])
  end

  def set_room_cookie
    cookies.encrypted[:room_uuid] = params[:uuid]
  end

  def room_params
    params.require(:room).permit(:name, :password, :password_confirmation)
  end

  def authenticate
    token = Authentication.find_by_token(cookies.encrypted[:authentication_token])

    if token.nil? || @room.nil? || token.room_uuid != @room.uuid
      redirect_to authenticate_path(params[:uuid])
    end
  end

  def does_room_exist
    unless @room.present?
      redirect_to authenticate_path(params[:uuid])
    end
  end
end

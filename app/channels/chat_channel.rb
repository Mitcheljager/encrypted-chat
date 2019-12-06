class ChatChannel < ApplicationCable::Channel
  def subscribed
    room = Room.find_by_uuid(params[:uuid])
    stream_for room

    sleep 0.5

    ChatChannel.broadcast_to room,
      type: "server",
      uuid: room.uuid,
      content: authentication.username + " has joined the room.",
      timestamp: Time.now
  end

  def unsubscribed
    room = Room.find_by_uuid(params[:uuid])
    stream_for room

    ChatChannel.broadcast_to room,
      type: "server",
      uuid: room.uuid,
      content: authentication.username + " has left the channel.",
      timestamp: Time.now
  end
end

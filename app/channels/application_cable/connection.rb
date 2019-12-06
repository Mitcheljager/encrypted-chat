module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :authentication

    def connect
      self.authentication = find_authentication
    end

    private

    def find_authentication
      room = Room.find_by_uuid(cookies.encrypted[:room_uuid])
      token = Authentication.find_by_token(cookies.encrypted[:authentication_token])

      if token.nil? || room.nil? || token.room_uuid != room.uuid
        reject_unauthorized_connection
      else
        token
      end
    end
  end
end

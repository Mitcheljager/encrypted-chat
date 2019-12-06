class Authentication < ApplicationRecord
  encrypts :username, type: :string
  encrypts :room_uuid, type: :string
  encrypts :token, type: :string

  blind_index :token, slow: true
end

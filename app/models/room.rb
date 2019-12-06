class Room < ApplicationRecord
  has_secure_password

  encrypts :name, type: :string
end

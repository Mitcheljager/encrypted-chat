class Room < ApplicationRecord
  has_secure_password validations: false

  encrypts :name, type: :string
end

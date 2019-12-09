class AddExpirationTimeToRooms < ActiveRecord::Migration[6.0]
  def change
    add_column :rooms, :expiration_time, :integer, default: 0
  end
end

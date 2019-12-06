class CreateRooms < ActiveRecord::Migration[6.0]
  def change
    create_table :rooms do |t|
      t.string :password_digest
      t.string :uuid

      t.timestamps
    end
  end
end

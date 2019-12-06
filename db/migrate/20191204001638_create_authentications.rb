class CreateAuthentications < ActiveRecord::Migration[6.0]
  def change
    create_table :authentications do |t|
      t.text :username_ciphertext
      t.text :room_uuid_ciphertext
      t.text :token_ciphertext

      t.timestamps
    end
  end
end

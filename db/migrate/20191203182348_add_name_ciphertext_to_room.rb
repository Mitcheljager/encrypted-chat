class AddNameCiphertextToRoom < ActiveRecord::Migration[6.0]
  def change
    add_column :rooms, :name_ciphertext, :text
  end
end

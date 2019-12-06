class AddBlindIndexToAuthentications < ActiveRecord::Migration[6.0]
  def change
    add_column :authentications, :token_bidx, :string
    add_index :authentications, :token_bidx
  end
end

class AddUuidToAuthentications < ActiveRecord::Migration[6.0]
  def change
    add_column :authentications, :uuid, :string
  end
end

class AddUserToAuction1 < ActiveRecord::Migration[5.1]
  def change
    add_reference :auction1s, :user, foreign_key: true
  end
end

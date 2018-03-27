class AddUserToBibs < ActiveRecord::Migration[5.1]
  def change
    add_reference :bibs, :user, foreign_key: true
  end
end

class CreateBibs < ActiveRecord::Migration[5.1]
  def change
    create_table :bibs do |t|
      t.float :bid
      t.references :auction1, foreign_key: true, index: true

      t.timestamps
    end
  end
end

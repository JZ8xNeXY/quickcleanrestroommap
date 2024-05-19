class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.string :name, null: false
      t.string :address, null: false
      t.string :content, null: false
      t.float :latitude, null: false
      t.float :longitude, null: false
      t.boolean :nursing_room, null: false
      t.boolean :anyone_toilet, null: false
      t.boolean :diaper_changing_station, null: false
      t.boolean :powder_corner, null: false
      t.boolean :stroller_accessible, null: false
      t.timestamps
    end
  end
end

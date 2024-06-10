class ChangeLatitudeAndLongitudeToDoubleInPosts < ActiveRecord::Migration[7.0]
  def change
    change_column :posts, :latitude, :double
    change_column :posts, :longitude, :double
  end
end

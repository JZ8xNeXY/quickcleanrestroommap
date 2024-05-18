class PostSerializer < ActiveModel::Serializer

  include Rails.application.routes.url_helpers

  attributes :id, :name, :address, :content, :latitude, :longitude, :created_at, :nursing_room, :anyone_toilet,
             :diaper_changing_station, :powder_corner, :stroller_accessible,
            #  :image

  def name
    object.name
  end

  def address
    object.address
  end

  def content
    object.content
  end

  def latitude
    object.latitude
  end

  def longitude
    object.longitude
  end

  def nursing_room
    object.nursing_room
  end

  def anyone_toilet
    object.anyone_toilet
  end

  def diaper_changing_station
    object.diaper_changing_station
  end

  def powder_corner
    object.powder_corner
  end

  def stroller_accessible
    object.stroller_accessible
  end

  # def image
  #   if object.image.attached?
  #     # ローカルと本番環境で分ける
  #     rails_blob_url(object.image, host: 'localhost', port: 3000)
  #   end
  # end
end

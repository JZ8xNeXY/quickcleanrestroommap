class PostSerializer < ActiveModel::Serializer

  include Rails.application.routes.url_helpers

  attributes :id, :name, :address, :content, :latitude, :longitude, :created_at, :nursing_room, :anyone_toilet,
             :diaper_changing_station, :powder_corner, :stroller_accessible,
            #  :image

  def name
    object.facility.name
  end

  def address
    object.facility.address
  end

  def content
    object.facility.content
  end

  def latitude
    object.facility.latitude
  end

  def longitude
    object.facility.longitude
  end

  def nursing_room
    object.facility.nursing_room
  end

  def anyone_toilet
    object.facility.anyone_toilet
  end

  def diaper_changing_station
    object.facility.diaper_changing_station
  end

  def powder_corner
    object.facility.powder_corner
  end

  def stroller_accessible
    object.facility.stroller_accessible
  end

  # def image
  #   if object.facility.image.attached?
  #     # ローカルと本番環境で分ける
  #     rails_blob_url(object.facility.image, host: 'localhost', port: 3000)
  #   end
  # end
end

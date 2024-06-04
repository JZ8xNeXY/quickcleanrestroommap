class PostSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :name, :address, :content, :latitude, :longitude, :created_at, :nursing_room, :anyone_toilet,
             :diaper_changing_station, :powder_corner, :stroller_accessible, :evaluation
             :image

  def id
    object.id
  end

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

  def evaluation
    object.evaluation
  end

  def image
    return unless object.image.attached?

    host = Rails.env.production? ? 'backend.quickcleanrestrooms.com' : 'localhost'
    port = Rails.env.development? ? 3000 : nil
    protocol = Rails.env.production? ? 'https' : 'http'

    url = rails_blob_url(object.image, host:, port:, protocol:)
    Rails.logger.debug "Generated URL: #{url}"
    url
  end
end

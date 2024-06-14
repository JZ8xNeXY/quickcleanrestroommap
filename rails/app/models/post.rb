class Post < ApplicationRecord
  has_one_attached :image

  validates :name, presence: true, unless: :was_attached?
  validates :latitude, presence: true
  validates :longitude, presence: true
  validates :evaluation, inclusion: { in: 1..5, message: 'must be between 1 and 5' }
  validates :evaluation, numericality: { only_integer: true, message: 'must be an integer' }
  def was_attached?
    image.attached?
  end
end

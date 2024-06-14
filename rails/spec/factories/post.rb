FactoryBot.define do
  factory :post do
    name { Faker::Address.city }
    address { "東京都#{Faker::Address.city}" }
    content { Faker::Lorem.sentence }
    latitude { Faker::Number.between(from: 35.681236 - 0.1, to: 35.681236 + 0.1) }
    longitude { Faker::Number.between(from: 139.767125 - 0.1, to: 139.767125 + 0.1) }
    nursing_room { Faker::Number.between(from: 0, to: 1) }
    anyone_toilet { Faker::Number.between(from: 0, to: 1) }
    diaper_changing_station { Faker::Number.between(from: 0, to: 1) }
    powder_corner { Faker::Number.between(from: 0, to: 1) }
    stroller_accessible { Faker::Number.between(from: 0, to: 1) }
    evaluation { Faker::Number.between(from: 1, to: 5) }

    after(:build) do |post|
      post.image.attach(io: File.open('public/test.jpeg'), filename: 'test.jpeg')
    end
  end
end

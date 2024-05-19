post = Post.create!(
  name: 'としま区民センター',
  address: '東京都豊島区',
  content: 'とても綺麗だった',
  latitude: 35.7315,
  longitude: 139.716,
  nursing_room: true,
  anyone_toilet: true,
  diaper_changing_station: true,
  powder_corner: true,
  stroller_accessible: true
)

# ファイルを添付
post.image.attach(
  io: File.open(Rails.root.join('app/assets/images/toshima.jpeg')),
  filename: 'toshima.jpeg',
  content_type: 'image/jpeg'
)

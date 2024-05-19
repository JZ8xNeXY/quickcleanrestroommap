post = Post.create!(
  name: '丸の内',
  address: '東京都豊島区',
  content: 'とても綺麗だった',
  latitude: 35.6,
  longitude: 139.6,
  nursing_room: true,
  anyone_toilet: true,
  diaper_changing_station: true,
  powder_corner: true,
  stroller_accessible: true
)

# ファイルを添付
post.image.attach(
  io: File.open(Rails.root.join('app/assets/images/marunouchi.jpeg')),
  filename: 'marunouchi.jpeg',
  content_type: 'image/jpeg'
)

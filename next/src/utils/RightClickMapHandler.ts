interface RightClickMapHandlerProps {
  map: google.maps.Map
}

export const RightClickMapHandler = ({ map }: RightClickMapHandlerProps) => {
  map.addListener('rightclick', (e: google.maps.MapMouseEvent) => {
    const latitude = e.latLng?.lat()
    const longitude = e.latLng?.lng()

    if (latitude !== undefined && longitude !== undefined) {
      console.log(latitude, longitude)

      const pinViewScaled = new google.maps.marker.PinView({
        background: '#4CAF50',
        glyphColor: 'white',
      })

      // マーカーを作成してマップに追加
      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: { lat: latitude, lng: longitude },
        map,
        content: pinViewScaled.element,
      })

      // 登録画面へのリンクを含む吹き出しを生成

      const contentString = `
      <div id="infoWindowContent" style="padding: 15px;">
        <a href="${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/new?latitude=${latitude}&longitude=${longitude}">
          ここを登録する
        </a>
      </div>`

      const infowindow = new google.maps.InfoWindow({
        content: contentString,
        position: e.latLng,
      })

      infowindow.open(map, marker)

      // 情報ウィンドウの閉じるボタンがクリックされたらマーカーを削除
      infowindow.addListener('closeclick', function () {
        marker.setMap(null)
      })

      return marker
    }
  })
}

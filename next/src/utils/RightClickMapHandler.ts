interface RightClickMapHandlerProps {
  map: google.maps.Map
  setOpenAddRestroomModal: React.Dispatch<React.SetStateAction<boolean | null>>
  setCoords: React.Dispatch<
    React.SetStateAction<{ lat: number; lng: number } | null>
  >
}

export const RightClickMapHandler = ({
  map,
  setOpenAddRestroomModal,
  setCoords,
}: RightClickMapHandlerProps) => {
  map.addListener('rightclick', (e: google.maps.MapMouseEvent) => {
    const latitude = e.latLng?.lat()
    const longitude = e.latLng?.lng()

    if (latitude !== undefined && longitude !== undefined) {
      setCoords({ lat: latitude, lng: longitude }) //緯度経度更新

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
        <button id="openModalButton" 
                style="background-color: #4CAF50;
                color: white; border: none;
                padding: 10px 20px; 
                cursor: pointer;">
          ここを登録する
        </button>
      </div>`

      const infowindow = new google.maps.InfoWindow({
        content: contentString,
        position: e.latLng,
      })

      infowindow.open(map, marker)

      google.maps.event.addListenerOnce(infowindow, 'domready', () => {
        document
          .getElementById('openModalButton')
          ?.addEventListener('click', () => {
            setOpenAddRestroomModal(true)
            infowindow.close()
          })
      })

      // 情報ウィンドウの閉じるボタンがクリックされたらマーカーを削除
      infowindow.addListener('closeclick', function () {
        marker.setMap(null)
      })

      return marker
    }
  })
}

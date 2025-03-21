// //マップを作成して表示する
export const initMap = async (
  setMap: React.Dispatch<React.SetStateAction<google.maps.Map | null>>,
) => {
  const mapElement = document.getElementById('map')
  if (!mapElement) return

  if (mapElement) {
    const map = new google.maps.Map(mapElement, {
      zoom: 16,
      mapId: 'DEMO_MAP_ID',
      maxZoom: 25,
      center: { lat: 35.681236, lng: 139.767125 }, //東京駅
      mapTypeId: 'roadmap',
    })

    setMap(map)
  } else {
    console.error('Google Maps API is not available')
  }
}

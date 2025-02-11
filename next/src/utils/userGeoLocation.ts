import '../styles/Home.module.css'

interface UserGeoLocationProps {
  map: google.maps.Map | null
  setCurrentUserPos: (pos: { lat: number; lng: number }) => void
}

export const userGeoLocation = ({
  map,
  setCurrentUserPos,
}: UserGeoLocationProps) => {
  const createMarker = async (position: { lat: number; lng: number }) => {
    const userPosImg = document.createElement('img')
    userPosImg.src = '/userposition.png'
    userPosImg.width = 75
    userPosImg.height = 75
    userPosImg.classList.add('bounce')

    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      'marker',
    )) as google.maps.MarkerLibrary

    new AdvancedMarkerElement({
      map,
      position,
      title: 'Your Location',
      content: userPosImg,
      zIndex: 1,
    })

    setCurrentUserPos(position)

    if (map) {
      map.setCenter(position)
    }
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const userPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }

        await createMarker(userPos)
      },
      async () => {
        const tokyoStationPos = { lat: 35.681236, lng: 139.767125 }

        await createMarker(tokyoStationPos)
      },
    )
  } else {
    alert('Geolocation is not supported by this browser.')
  }
}

import camelcaseKeys from 'camelcase-keys'
import type { NextPage } from 'next'
import { useEffect, useState, useRef } from 'react'
import useSWR from 'swr'
import { useRestroomContext } from '@/context/RestRoomContext'
import AddMarkers from '@/presentationals/AddMarkers'
import { fetcher } from '@/utils'
import { userGeoLocation } from '@/utils/userGeoLocation'

interface AddMarkersProps {
  map: google.maps.Map | null
}

interface Restroom {
  id: number
  name: string
  address: string
  content: string
  latitude: number
  longitude: number
  createdAt: string
  nursingRoom: boolean
  anyoneToilet: boolean
  diaperChangingStation: boolean
  powderCorner: boolean
  strollerAccessible: boolean
  image: string
}

const AddMarkersContainer: NextPage<AddMarkersProps> = ({ map }) => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/posts'
  const { data, error } = useSWR(url, fetcher, { revalidateOnFocus: false })

  const { selectedRestroom, setSelectedRestroom } = useRestroomContext()

  const [openModalWindow, setOpenModalWindow] = useState(false)
  const closeModalWindow = () => setOpenModalWindow(false)

  const [currentUserPos, setCurrentUserPos] = useState<{
    lat: number
    lng: number
  }>()

  const showGeolocationButton = useRef<HTMLButtonElement>(null)

  const FindCurrentLocation = () => {
    if (map) {
      userGeoLocation({ map, setCurrentUserPos })
    }
  }

  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([])

  useEffect(() => {
    const addMarkers = async () => {
      if (map && data) {
        markersRef.current.forEach((marker) => (marker.map = null))
        markersRef.current = []

        const restrooms: Restroom[] = data ? camelcaseKeys(data) : []

        const { AdvancedMarkerElement } = (await google.maps.importLibrary(
          'marker',
        )) as google.maps.MarkerLibrary

        restrooms.forEach((restroom) => {
          const restroomImg = document.createElement('img')
          restroomImg.src = '/restroom.png'
          restroomImg.alt = restroom.name
          restroomImg.width = 75
          restroomImg.height = 75

          const marker = new AdvancedMarkerElement({
            map,
            position: { lat: restroom.latitude, lng: restroom.longitude },
            title: restroom.name,
            content: restroomImg,
          })

          marker.addListener('gmp-click', function () {
            setOpenModalWindow(true)
            setSelectedRestroom({
              id: restroom.id,
              name: restroom.name,
              address: restroom.address,
              content: restroom.content,
              latitude: restroom.latitude,
              longitude: restroom.longitude,
              createdAt: restroom.createdAt,
              nursingRoom: restroom.nursingRoom,
              anyoneToilet: restroom.anyoneToilet,
              diaperChangingStation: restroom.diaperChangingStation,
              powderCorner: restroom.powderCorner,
              strollerAccessible: restroom.strollerAccessible,
              image: restroom.image,
            })
          })

          markersRef.current.push(marker)
        })
      }
    }

    addMarkers()

    if (map && showGeolocationButton.current) {
      const controlPosition = google.maps.ControlPosition.TOP_CENTER
      map.controls[controlPosition].push(showGeolocationButton.current)

      return () => {
        const controls = map.controls[controlPosition]
        for (let i = 0; i < controls.getLength(); i++) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          if (controls.getAt(i) === showGeolocationButton.current) {
            controls.removeAt(i)
            break
          }
        }
      }
    }
  }, [map, data, selectedRestroom, setSelectedRestroom])

  return (
    <AddMarkers
      error={error}
      data={data}
      openModalWindow={openModalWindow}
      closeModalWindow={closeModalWindow}
      selectedRestroom={selectedRestroom}
      currentUserPos={currentUserPos}
      FindCurrentLocation={FindCurrentLocation}
      showGeolocationButton={showGeolocationButton}
      map={map}
    />
  )
}

export default AddMarkersContainer

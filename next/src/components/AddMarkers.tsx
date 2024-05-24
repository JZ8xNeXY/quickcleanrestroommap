import { Box, Button } from '@mui/material'
import camelcaseKeys from 'camelcase-keys'
import type { NextPage } from 'next'
import { useEffect, useState, useRef } from 'react'
import useSWR from 'swr'
import CalculateAndDisplayRoute from './CalculateAndDisplayRoute'
import DisplayModalWindow from './DisplayModalWindow'
import { useRestroomContext } from '@/context/RestRoomContext'
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

// eslint-disable-next-line react/prop-types
const AddMarkers: NextPage<AddMarkersProps> = ({ map }) => {
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

  useEffect(() => {
    const addMarkers = async () => {
      if (map && data) {
        const restrooms: Restroom[] = data ? camelcaseKeys(data) : []

        const { AdvancedMarkerElement } = (await google.maps.importLibrary(
          'marker',
        )) as google.maps.MarkerLibrary

        //マーカーの作成
        restrooms.forEach((restroom) => {
          //画像の読み込み
          const restroomImg = document.createElement('img')
          restroomImg.src = '/restroom.png'
          restroomImg.alt = restroom.name
          restroomImg.width = 75
          restroomImg.height = 75
          //マーカーの表示
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
        })
      }
    }

    addMarkers()

    if (map && showGeolocationButton.current) {
      const controlPosition = google.maps.ControlPosition.TOP_CENTER
      // eslint-disable-next-line react/prop-types
      map.controls[controlPosition].push(showGeolocationButton.current)

      return () => {
        //既存のボタンがある場合削除
        // eslint-disable-next-line react/prop-types
        const controls = map.controls[controlPosition]
        // eslint-disable-next-line react/prop-types
        for (let i = 0; i < controls.getLength(); i++) {
          // eslint-disable-next-line react-hooks/exhaustive-deps, react/prop-types
          if (controls.getAt(i) === showGeolocationButton.current) {
            // eslint-disable-next-line react/prop-types
            controls.removeAt(i)
            break
          }
        }
      }
    }
  }, [map, data, selectedRestroom, setSelectedRestroom])

  if (error) return <Box>An error has occurred.</Box>
  if (!data) return <Box>Loading...</Box>

  return (
    <>
      <DisplayModalWindow
        openModalWindow={openModalWindow}
        closeModalWindow={closeModalWindow}
        name={selectedRestroom.name}
        address={selectedRestroom.address}
        content={selectedRestroom.content}
        nursingRoom={selectedRestroom.nursingRoom}
        anyoneToilet={selectedRestroom.anyoneToilet}
        diaperChangingStation={selectedRestroom.diaperChangingStation}
        powderCorner={selectedRestroom.powderCorner}
        strollerAccessible={selectedRestroom.strollerAccessible}
        image={selectedRestroom.image}
      />
      {currentUserPos &&
        selectedRestroom.latitude !== undefined &&
        selectedRestroom.longitude !== undefined && (
          <CalculateAndDisplayRoute
            userPos={currentUserPos}
            latitude={selectedRestroom.latitude}
            longitude={selectedRestroom.longitude}
            map={map}
          />
        )}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          ref={showGeolocationButton}
          onClick={FindCurrentLocation}
          sx={{
            height: '60px',
            fontSize: '16px',
            color: '#FFFFFF',
            fontWeight: 'bold',
            bgcolor: '#4CAF50',
            pt: 2,
            pb: 2,
            pl: 4,
            pr: 4,
            mt: 2,
            ':hover': {
              backgroundColor: '#006400',
            },
          }}
        >
          現在地を表示する
        </Button>
      </Box>
    </>
  )
}

export default AddMarkers

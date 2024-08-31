import camelcaseKeys from 'camelcase-keys'
import type { NextPage } from 'next'
import { useEffect, useState, useRef, useCallback } from 'react'
import useSWR from 'swr'
import { supabase } from '../utils/supabase'
import { useRestroomContext } from '@/context/RestRoomContext'
import { Restroom } from '@/interface/restroomInterface'
import AddMarkers from '@/presentationals/AddMarkers'
import { userGeoLocation } from '@/utils/userGeoLocation'

interface AddMarkersProps {
  map: google.maps.Map | null
  currentUserPos: { lat: number; lng: number }
  setCurrentUserPos: React.Dispatch<
    React.SetStateAction<
      { lat: number; lng: number } | { lat: 35.681236; lng: 139.767125 }
    >
  >
}

const AddMarkersContainer: NextPage<AddMarkersProps> = ({
  map,
  currentUserPos,
  setCurrentUserPos,
}) => {
  const { selectedRestroom, setSelectedRestroom } = useRestroomContext()

  const [openModalWindow, setOpenModalWindow] = useState(false)

  const closeModalWindow = () => setOpenModalWindow(false)

  //再レンダリングされても状態を保持するため 不要な更新を防ぐ
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([])

  const fetchPosts = async () => {
    const { data, error } = await supabase.from('posts').select('*')
    if (error) {
      throw new Error(error.message)
    }
    return data
  }

  const { data, error } = useSWR('fetchPosts', fetchPosts, {
    revalidateOnFocus: false, //SWRオプションの再検証の無効化
  })

  //現在地を取得するのは最初の１回かつmapを取得したきのみ 不要なuseEffectの実行を防ぐ
  const FindCurrentLocation = useCallback(() => {
    if (map) {
      userGeoLocation({ map, setCurrentUserPos })
    }
  }, [map, setCurrentUserPos])

  useEffect(() => {
    FindCurrentLocation()
  }, [FindCurrentLocation])

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
              evaluation: restroom.evaluation,
              image: restroom.image,
            })
          })

          markersRef.current.push(marker)
        })
      }
    }

    if (map) {
      addMarkers()
    }
  }, [map, data, setSelectedRestroom])

  return (
    <AddMarkers
      error={error}
      data={data}
      openModalWindow={openModalWindow}
      closeModalWindow={closeModalWindow}
      selectedRestroom={selectedRestroom}
      currentUserPos={currentUserPos}
      map={map}
    />
  )
}

export default AddMarkersContainer

import { MarkerClusterer, DefaultRenderer } from '@googlemaps/markerclusterer'
import camelcaseKeys from 'camelcase-keys'
import type { NextPage } from 'next'
import { useEffect, useState, useRef, useCallback } from 'react'
import useSWR from 'swr'
import { supabase } from '../utils/supabase'
import { useRestroomContext } from '@/context/RestRoomContext'
import { Restrooms } from '@/interface/restroomInterface'
import AddMarkers from '@/presentationals/AddMarkers'
import { userGeoLocation } from '@/utils/userGeoLocation'

interface AddMarkersProps {
  map: google.maps.Map | null
  currentUserPos: { lat: number; lng: number }
  setCurrentUserPos: React.Dispatch<
    React.SetStateAction<
      { lat: number; lng: number } | { lat: 35.681236; lng: 139.767125 } //初期値は東京駅
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

  //状態の不要な更新を防ぐ
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([])
  const clustererRef = useRef<MarkerClusterer | null>(null)

  const fetchPosts = async () => {
    const { data, error } = await supabase.from('posts').select('*')
    if (error) {
      throw new Error(error.message)
    }
    return data
  }

  // SWRを使ってデータをフェッチし、ウィンドウやタブのフォーカス時の再フェッチを無効化
  const { data, error } = useSWR('fetchPosts', fetchPosts, {
    revalidateOnFocus: false,
  })

  const findCurrentLocation = useCallback(() => {
    if (map) {
      userGeoLocation({ map, setCurrentUserPos })
    }
  }, [map, setCurrentUserPos])

  useEffect(() => {
    findCurrentLocation()
  }, [findCurrentLocation])

  useEffect(() => {
    const addMarkersToMap = async () => {
      if (map && data) {
        // 非同期更新の実現のため、現在のマーカーをすべてマップから削除して、マーカーの配列をリセットする
        markersRef.current.forEach((marker) => (marker.map = null))
        markersRef.current = []

        const restrooms: Restrooms[] = data ? camelcaseKeys(data) : []

        const { AdvancedMarkerElement } = (await google.maps.importLibrary(
          'marker',
        )) as google.maps.MarkerLibrary

        const markers: google.maps.marker.AdvancedMarkerElement[] = []

        restrooms.forEach((restroom) => {
          const restroomImg = document.createElement('img')
          restroomImg.src = '/restroom.png'
          restroomImg.alt = restroom.name || ''
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
              userId: restroom.userId,
            })
          })
          markers.push(marker)

          markersRef.current.push(marker)
        })

        class CustomClusterRenderer extends DefaultRenderer {
          getColor(count) {
            if (count >= 10) return 'red'
            if (count >= 5) return 'orange'
            return 'blue'
          }

          render({ count, position }) {
            const color = this.getColor(count)
            const svg = window.btoa(`
              <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
                <circle cx="120" cy="120" opacity=".8" r="70" />
              </svg>
            `)

            return new google.maps.Marker({
              position,
              icon: {
                url: `data:image/svg+xml;base64,${svg}`,
                scaledSize: new google.maps.Size(100, 100),
              },
              label: {
                text: String(count),
                color: 'rgba(255,255,255,0.9)',
                fontSize: '12px',
              },
              zIndex: Number(google.maps.Marker.MAX_ZINDEX + 1000) + count,
            })
          }
        }

        if (map && markers.length) {
          if (clustererRef.current) {
            clustererRef.current.clearMarkers()
          }

          clustererRef.current = new MarkerClusterer({
            map,
            markers,
            renderer: new CustomClusterRenderer(),
            maxZoom: 15,
          })
        }
      }
    }

    addMarkersToMap()
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

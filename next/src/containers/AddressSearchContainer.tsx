import { useState, useEffect, useCallback } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRestroomContext } from '@/context/RestRoomContext'
import { useSessionContext } from '@/context/SessionContext'
import {
  AddressSearchFormData,
  AddressSearchProps,
} from '@/interface/addressSearchFormDataInterface'
import AddressSearch from '@/presentationals/AddressSearch'

const AddressSearchContainer: React.FC<AddressSearchProps> = ({
  open,
  onClose,
}) => {
  const { handleSubmit, control, reset } = useForm<AddressSearchFormData>({
    defaultValues: {
      addressSearch: '',
    },
  })

  const [warningAddressSearchMessage, setWarningAddressSearchMessage] =
    useState('')
  const [addressSearch, setAddressSearch] = useState('')
  const { map } = useRestroomContext()
  const { currentUser } = useSessionContext()

  const resetModal = useCallback(() => {
    reset()
    onClose()
  }, [reset, onClose])

  const onsubmit: SubmitHandler<AddressSearchFormData> = async (data) => {
    if (!data.addressSearch) {
      setWarningAddressSearchMessage('住所を入力してください')
      return
    }

    if (warningAddressSearchMessage != null) {
      resetModal()
    }
    setAddressSearch(data.addressSearch)
  }

  useEffect(() => {
    if (!map || !addressSearch) return

    const fetchPlacesService = async () => {
      try {
        const placesLibrary = await google.maps.importLibrary('places')
        const { PlacesService } = placesLibrary as unknown as {
          PlacesService: typeof google.maps.places.PlacesService
        }

        const service = new PlacesService(map)

        const request = {
          query: addressSearch,
          fields: ['name', 'geometry'],
        }

        service.findPlaceFromQuery(request, (results, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            results?.[0]?.geometry?.location
          ) {
            console.log(results[0])
            map.setCenter(results[0].geometry.location)
          } else {
            setWarningAddressSearchMessage('検索結果が見つかりませんでした')
          }
        })
      } catch (error) {
        console.error('PlacesServiceの読み込みに失敗しました:', error)
        setWarningAddressSearchMessage('PlacesServiceの読み込みに失敗しました')
      }
    }

    fetchPlacesService()
  }, [map, addressSearch, resetModal])

  return (
    <AddressSearch
      user={currentUser}
      open={open}
      onClose={resetModal}
      handleSubmit={handleSubmit}
      onSubmit={onsubmit}
      control={control}
      warningAddressSearchMessage={warningAddressSearchMessage}
    />
  )
}

export default AddressSearchContainer

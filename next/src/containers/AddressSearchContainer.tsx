import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
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

  const { currentUser } = useSessionContext()

  const resetModal = () => {
    reset()
    onClose()
  }

  const onsubmit: SubmitHandler<AddressSearchFormData> = async (data) => {
    if (!data) {
      setWarningAddressSearchMessage('住所を入力してください')
      return
    }

    const request = {
      query: data.addressSearch,
      fields: ['name', 'geometry'],
    }

    console.log(data.addressSearch)

    const service = new google.maps.places.PlacesService(map)

    service.findPlaceFromQuery(request, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        map.setCenter(results[0].geometry.location)
      }
    })
  }

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

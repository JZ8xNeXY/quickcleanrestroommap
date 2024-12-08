import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useSessionContext } from '@/context/SessionContext'
import {
  AddressSearchFormData,
  AddressSearchProps,
} from '@/interface/addressSearchInterface'

const AddressSearchContainer: React.FC<AddressSearchProps> = ({
  open,
  onClose,
}) => {
  const { register, handleSubmit, control, reset } =
    useForm<AddressSearchFormData>({
      defaultValues: {
        addressSearch: '',
      },
    })

  const [warningAddressSearchMessage, setWarningAddressSearchMessage] =
    useState('')

  const resetModal = () => {
    reset()
    onClose()
  }

  const onsubmit: SubmitHandler<AddressSearchFormData> = async (data) => {
    if (!data) {
      setWarningAddressSearchMessage('住所を入力してください')
      return
    }

    const postData = {
      addressSearch: data.addressSearch,
    }

    console.log(postData)
  }

  return (
    <AddressSearch
      open={open}
      onClose={resetModal}
      handleSubmit={handleSubmit}
      onSubmit={onsubmit}
      control={control}
      register={register}
      warningAddressSearchMessage={warningAddressSearchMessage}
    />
  )
}

export default AddressSearchContainer

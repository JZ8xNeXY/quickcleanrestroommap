import React, { useState } from 'react'
import EditRestroom from '@/components/EditRestroom'
import DisplayModalWindow from '@/presentationals/DisplayModalWindow'

interface DisplayModalWindowContainerProps {
  openModalWindow: boolean
  closeModalWindow: () => void
  name: string
  address: string
  content: string
  latitude: number
  longitude: number
  nursingRoom?: boolean
  anyoneToilet?: boolean
  diaperChangingStation?: boolean
  powderCorner?: boolean
  strollerAccessible?: boolean
  image: string
}

const DisplayModalWindowContainer: React.FC<
  DisplayModalWindowContainerProps
> = ({
  openModalWindow,
  closeModalWindow,
  name,
  address,
  content,
  latitude,
  longitude,
  nursingRoom,
  anyoneToilet,
  diaperChangingStation,
  powderCorner,
  strollerAccessible,
  image,
}) => {
  const [editModalWindow, setEditModalWindow] = useState(false)
  const openEditRestroomModalWindow = () => setEditModalWindow(true)
  const closeEditRestroomModalWindow = () => setEditModalWindow(false)

  return (
    <>
      <EditRestroom
        open={editModalWindow}
        onClose={closeEditRestroomModalWindow}
      />
      <DisplayModalWindow
        openModalWindow={openModalWindow}
        closeModalWindow={closeModalWindow}
        name={name}
        address={address}
        content={content}
        latitude={latitude}
        longitude={longitude}
        nursingRoom={nursingRoom}
        anyoneToilet={anyoneToilet}
        diaperChangingStation={diaperChangingStation}
        powderCorner={powderCorner}
        strollerAccessible={strollerAccessible}
        image={image}
        openEditRestroomModalWindow={openEditRestroomModalWindow}
      />
    </>
  )
}

export default DisplayModalWindowContainer

import React, { useState } from 'react'
import EditRestroomContainer from './EditRestroomContainer'
import { userSessionContext } from '@/context/SessionContext'
import { Restroom } from '@/interface/restroomInterface'
import DisplayModalWindow from '@/presentationals/DisplayModalWindow'

interface DisplayModalWindowContainerProps extends Restroom {
  openModalWindow: boolean
  closeModalWindow: () => void
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
  evaluation,
  image,
}) => {
  const { currentUser } = userSessionContext()
  const [editModalWindow, setEditModalWindow] = useState(false)
  const openEditRestroomModalWindow = () => setEditModalWindow(true)
  const closeEditRestroomModalWindow = () => setEditModalWindow(false)

  return (
    <>
      <EditRestroomContainer
        open={editModalWindow}
        onClose={closeEditRestroomModalWindow}
      />
      <DisplayModalWindow
        user={currentUser}
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
        evaluation={evaluation}
        image={image}
        openEditRestroomModalWindow={openEditRestroomModalWindow}
      />
    </>
  )
}

export default DisplayModalWindowContainer

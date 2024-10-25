import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Restrooms } from '@/interface/restroomInterface'

interface RestroomContextProps {
  selectedRestroom: Restrooms
  setSelectedRestroom: React.Dispatch<React.SetStateAction<Restrooms>>
}

const defaultRestroom: Restrooms = {
  id: 0,
  name: '',
  address: '',
  content: '',
  image: '',
  latitude: 0,
  longitude: 0,
  createdAt: '',
  nursingRoom: false,
  anyoneToilet: false,
  diaperChangingStation: false,
  powderCorner: false,
  strollerAccessible: false,
  evaluation: 0,
  userId: '',
}

const RestroomContext = createContext<RestroomContextProps | undefined>(
  undefined,
)

export function RestroomProvider({ children }: { children: ReactNode }) {
  const [selectedRestroom, setSelectedRestroom] =
    useState<Restrooms>(defaultRestroom)

  return (
    <RestroomContext.Provider value={{ selectedRestroom, setSelectedRestroom }}>
      {children}
    </RestroomContext.Provider>
  )
}

export const useRestroomContext = () => {
  const context = useContext(RestroomContext)
  if (!context) {
    throw new Error('useRestroomContext must be used within a RestroomProvider')
  }
  return context
}

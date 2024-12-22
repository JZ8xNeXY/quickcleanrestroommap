import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { User } from '@/interface/userInterface'
import { supabase } from '@/utils/supabase'

interface SessionContextProps {
  currentUser: User | null
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
}

const SessionContext = createContext<SessionContextProps | undefined>(undefined)

export const SessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        return
      }
      setCurrentUser({
        ...data.user,
        userUid: String(data.user?.id),
        email: data.user?.email || '',
        isFetched: true,
        isSignedIn: !!data.user,
      })
    }
    getCurrentUser()
  }, [])

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser))
    } else {
      localStorage.removeItem('currentUser')
    }
  }, [currentUser])

  return (
    <SessionContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </SessionContext.Provider>
  )
}

export const useSessionContext = () => {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error('useSessionContext must be used within a SessionProvider')
  }

  return context
}

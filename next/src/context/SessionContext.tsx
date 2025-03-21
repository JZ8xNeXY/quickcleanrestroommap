import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { User } from '@/interface/userInterface'

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
      try {
        const tokenResponse = await fetch('/api/getToken', {
          method: 'GET',
          credentials: 'include',
        })
        const tokenData = await tokenResponse.json()

        if (!tokenData.hasToken) {
          console.warn('No token found. Skipping API call.')
          return //
        }

        const response = await fetch('/api/getUser', {
          method: 'GET',
          credentials: 'include',
        })
        if (response.ok) {
          const user = await response.json()
          setCurrentUser({
            ...user,
            userUid: String(user.id),
            email: user.email || '',
            isFetched: true,
            isSignedIn: true,
          })
        } else {
          setCurrentUser(null)
        }
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }
    getCurrentUser()
  }, [])

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

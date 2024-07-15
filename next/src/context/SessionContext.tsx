import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'

interface SessionContextProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentUser: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setCurrentUser: (user: any) => void
}

const SessionContext = createContext<SessionContextProps | undefined>(undefined)

export const SessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentUser, setCurrentUser] = useState<any>(null)

  // ページロード時にローカルストレージからセッション情報を読み込む
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser))
    }
  }, [])

  // currentUserが変更された時にローカルストレージに保存する
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

import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useUserState } from '@/utils/useGlobalState'

const SignOut: NextPage = () => {
  const router = useRouter()
  const [, setUser] = useUserState()

  useEffect(() => {
    localStorage.clear()
    setUser({
      id: 0,
      email: '',
      isSignedIn: false,
      isFetched: true,
    })
    router.push('/')
  }, [router, setUser])

  return <></>
}

export default SignOut

import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { supabase } from '@/utils/supabase'
import { useUserState } from '@/utils/useGlobalState'

const SignOut: NextPage = () => {
  const router = useRouter()
  const [, setUser] = useUserState()

  useEffect(() => {
    const signOut = async () => {
      const { error } = await supabase.auth.signOut()
      if (error != null) {
        console.error('Error signing out:', error.message)
      } else {
        localStorage.clear()
        setUser({
          userUid: '0',
          email: '',
          isSignedIn: false,
          isFetched: true,
        })
        // 強制リロードを伴う遷移
        window.location.assign('/')
      }
    }

    signOut()
  }, [router, setUser])

  return <></>
}

export default SignOut

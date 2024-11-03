import useSWR from 'swr'

export const useUserState = () => {
  type userStateType = {
    userUid: string
    email: string
    isSignedIn: boolean
    isFetched: boolean
  }

  const fallbackData: userStateType = {
    userUid: 'dalja-e07-427-8f4-falkjdal',
    email: '',
    isSignedIn: false,
    isFetched: false,
  }

  const { data: state, mutate: setState } = useSWR('user', null, {
    fallbackData: fallbackData,
  })
  return [state, setState] as [userStateType, (value: userStateType) => void]
}

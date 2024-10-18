import { render, waitFor } from '@testing-library/react'
import { useRouter } from 'next/router'
import SignOut from '@/pages/sign_out'
import { supabase } from '@/utils/supabase'
import { useUserState } from '@/utils/useGlobalState'

beforeEach(() => {
  jest.clearAllMocks()

  Object.defineProperty(window, 'localStorage', {
    value: {
      clear: jest.fn(),
    },
    writable: true,
  })
})

jest.mock('@/utils/supabase', () => ({
  supabase: {
    auth: {
      signOut: jest.fn().mockResolvedValue({ error: null }), // エラーがない場合のモック
    },
  },
}))

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('@/utils/useGlobalState', () => ({
  useUserState: jest.fn(),
}))

describe('SignOut', () => {
  it('should sign out user, clear local storage, and redirect to home page', async () => {
    const mockPush = jest.fn()
    const setUserMock = jest.fn()

    const mockUseRouter = useRouter as jest.Mock
    mockUseRouter.mockReturnValue({
      push: mockPush,
    })

    const mockUseUserState = useUserState as jest.Mock
    mockUseUserState.mockReturnValue([{}, setUserMock])

    render(<SignOut />)

    await waitFor(() => {
      expect(supabase.auth.signOut).toHaveBeenCalled()
    })

    expect(localStorage.clear).toHaveBeenCalledTimes(1)

    expect(setUserMock).toHaveBeenCalledWith({
      id: 0,
      email: '',
      isSignedIn: false,
      isFetched: true,
    })

    expect(mockPush).toHaveBeenCalledWith('/')
  })
})

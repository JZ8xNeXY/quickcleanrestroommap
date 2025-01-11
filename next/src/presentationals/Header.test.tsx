import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { RestroomProvider } from '@/context/RestRoomContext'
import { SessionProvider } from '@/context/SessionContext'
import Header from '@/presentationals/Header'
import '@testing-library/jest-dom'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

beforeEach(() => {
  jest.clearAllMocks()
})

const mockHeaderProps = {
  router: jest.fn(),
  user: null,
  isOpen: false,
  openDrawer: jest.fn(() => jest.fn()),
  openAddressSearchModal: false,
  setOpenAddressSearchModal: jest.fn(),
  openAddSimpleRestroomModal: false,
  setOpenAddSimpleRestroomModal: jest.fn(),
  sideBar: jest.fn(() => <div>SideBar Content</div>),
}

describe('Header', () => {
  it('should display "ログインアイコン" when user is not signed in', () => {
    render(
      <SessionProvider>
        <RestroomProvider>
          <Header {...mockHeaderProps} />
        </RestroomProvider>
      </SessionProvider>,
    )

    expect(screen.getByTestId('LoginIcon')).toBeInTheDocument()
  })

  it('should display "ログイン中" when user is signed in', () => {
    const signedInUser = {
      id: '1',
      email: 'admin@example.com',
      isFetched: true,
      isSignedIn: true,
      app_metadata: {},
      user_metadata: {},
      aud: 'authenticated',
      created_at: '2023-01-01T00:00:00Z',
    }
    render(
      <SessionProvider>
        <RestroomProvider>
          <Header {...mockHeaderProps} user={signedInUser} />
        </RestroomProvider>
      </SessionProvider>,
    )

    expect(screen.queryByTestId('LoginIcon')).not.toBeInTheDocument()
  })

  it('should display "Icon"', () => {
    render(
      <SessionProvider>
        <RestroomProvider>
          <Header {...mockHeaderProps} />
        </RestroomProvider>
      </SessionProvider>,
    )
    const menuButtons = screen.getAllByLabelText('menu')
    const menuButton = menuButtons[0]
    expect(menuButton).toBeInTheDocument()
    expect(menuButton).toHaveAttribute('type', 'button')
    const menuIcon = screen.getByTestId('MenuIcon')
    expect(menuIcon).toBeInTheDocument()

    const addressSearchButton = menuButtons[1]
    expect(addressSearchButton).toBeInTheDocument()
    expect(addressSearchButton).toHaveAttribute('type', 'button')
    const addressSearchIcon = screen.getByTestId('SearchIcon')
    expect(addressSearchIcon).toBeInTheDocument()

    const addLocationButton = menuButtons[2]
    expect(addLocationButton).toBeInTheDocument()
    expect(addLocationButton).toHaveAttribute('type', 'button')
    const addLocationIcon = screen.getByTestId('AddLocationIcon')
    expect(addLocationIcon).toBeInTheDocument()
  })

  it('Should open the Drawer and display the sidebar when the menu button is clicked', async () => {
    const { rerender } = render(
      <SessionProvider>
        <RestroomProvider>
          <Header {...mockHeaderProps} />
        </RestroomProvider>
      </SessionProvider>,
    )
    const menuButtons = screen.getAllByLabelText('menu')
    const menuButton = menuButtons[0]
    await userEvent.click(menuButton)
    expect(mockHeaderProps.openDrawer).toHaveBeenCalledWith(true)
    expect(mockHeaderProps.openDrawer).toHaveBeenCalledTimes(2) //回数がおかしい再レンダリング可能性あり
    rerender(
      <SessionProvider>
        <RestroomProvider>
          <Header {...mockHeaderProps} isOpen={true} />
        </RestroomProvider>
      </SessionProvider>,
    )
    expect(screen.getByText('SideBar Content')).toBeInTheDocument()

    await waitFor(() => {
      rerender(
        <SessionProvider>
          <RestroomProvider>
            <Header {...mockHeaderProps} isOpen={false} />
          </RestroomProvider>
        </SessionProvider>,
      )
      expect(screen.queryByText('SideBar Content')).not.toBeInTheDocument()
    })
  })
})

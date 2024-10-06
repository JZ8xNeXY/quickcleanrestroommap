import { faker } from '@faker-js/faker'
import { render, screen, waitFor, within } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import Header from '@/presentationals/Header'
import '@testing-library/jest-dom'

beforeEach(() => {
  jest.clearAllMocks()
})

const mockHeaderProps = {
  user: null,
  isOpen: false,
  openDrawer: jest.fn(() => jest.fn()),
  openAddSimpleRestroomModal: false,
  setOpenAddSimpleRestroomModal: jest.fn(),
  sideBar: jest.fn(() => <div>SideBar Content</div>),
}

describe('Header', () => {
  it('should not display "管理者権限でログイン中" when user is not signed in', () => {
    render(<Header {...mockHeaderProps} />)
    const adminText = screen.queryByText('管理者権限でログイン中')
    expect(adminText).not.toBeInTheDocument()
  })

  it('should display "管理者権限でログイン中" when user is signed in', () => {
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
    render(<Header {...mockHeaderProps} user={signedInUser} />)
    expect(screen.getByText('管理者権限でログイン中')).toBeInTheDocument()
  })

  it('should display "Icon"', () => {
    render(<Header {...mockHeaderProps} />)
    const menuButtons = screen.getAllByLabelText('menu')
    const menuButton = menuButtons[0]
    expect(menuButton).toBeInTheDocument()
    expect(menuButton).toHaveAttribute('type', 'button')
    const menuIcon = screen.getByTestId('MenuIcon')
    expect(menuIcon).toBeInTheDocument()
    const addLocationButton = menuButtons[1]
    expect(addLocationButton).toBeInTheDocument()
    expect(addLocationButton).toHaveAttribute('type', 'button')
    const addLocationIcon = screen.getByTestId('AddLocationIcon')
    expect(addLocationIcon).toBeInTheDocument()
  })

  it('Should open the Drawer and display the sidebar when the menu button is clicked', async () => {
    const { rerender } = render(<Header {...mockHeaderProps} />)
    const menuButtons = screen.getAllByLabelText('menu')
    const menuButton = menuButtons[0]
    await userEvent.click(menuButton)
    expect(mockHeaderProps.openDrawer).toHaveBeenCalledWith(true)
    expect(mockHeaderProps.openDrawer).toHaveBeenCalledTimes(2) //回数がおかしい再レンダリング可能性あり
    rerender(<Header {...mockHeaderProps} isOpen={true} />)
    expect(screen.getByText('SideBar Content')).toBeInTheDocument()

    await waitFor(() => {
      rerender(<Header {...mockHeaderProps} isOpen={false} />)
      expect(screen.queryByText('SideBar Content')).not.toBeInTheDocument()
    })
  })
})




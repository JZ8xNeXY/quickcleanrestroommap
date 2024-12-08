import { render, screen, waitFor, within } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { SessionProvider } from '@/context/SessionContext'
import Header from '@/presentationals/Header'
import '@testing-library/jest-dom'

beforeEach(() => {
  jest.clearAllMocks()
})

const mockHeaderProps = {
  user: null,
  isOpen: false,
  openDrawer: jest.fn(() => jest.fn()),
  openAddressSearchModal: false,
  setOpenAddressSearchModal: jest.fn(),
  openAddSimpleRestroomModal: false,
  setOpenAddSimpleRestroomModal: jest.fn(),
  sideBar: jest.fn(() => <div>SideBar Content</div>),
}

describe('AddressSearch', () => {
  it('Should open the modal and display the modal when the modal button is clicked', async () => {
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

    const { rerender } = render(
      <SessionProvider>
        <Header {...mockHeaderProps} user={signedInUser} />
      </SessionProvider>,
    )

    const menuButtons = screen.getAllByLabelText('menu')
    const addressSearchButton = menuButtons[1]
    await userEvent.click(addressSearchButton)
    expect(mockHeaderProps.setOpenAddressSearchModal).toHaveBeenCalledWith(true)

    rerender(
      <SessionProvider>
        <Header
          {...mockHeaderProps}
          user={signedInUser}
          openAddressSearchModal={true}
        />
      </SessionProvider>,
    )

    const modal = screen.getByRole('presentation')
    expect(within(modal).getByText('住所から検索する')).toBeInTheDocument()

    const searchAddress = '東京都豊島区池袋'
    const inputElement = screen.getByLabelText('住所')
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveAttribute('type', 'text')
    await userEvent.type(inputElement, searchAddress)
    expect(inputElement).toHaveValue(searchAddress)

    const submitButton = screen.getByRole('button', { name: '検索する' })
    expect(submitButton).toBeInTheDocument()
    expect(submitButton).toHaveAttribute('type', 'submit')
  })
})

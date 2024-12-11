import { faker } from '@faker-js/faker'
import { render, screen, waitFor, within } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { SessionProvider } from '@/context/SessionContext'
import Header from '@/presentationals/Header'
import '@testing-library/jest-dom'
import { RestroomProvider } from '@/context/RestRoomContext'

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

describe('AddSimpleRestroom', () => {
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
        <RestroomProvider>
          <Header {...mockHeaderProps} user={signedInUser} />
        </RestroomProvider>
      </SessionProvider>,
    )
    const menuButtons = screen.getAllByLabelText('menu')
    const addLocationButton = menuButtons[2]
    await userEvent.click(addLocationButton)
    expect(mockHeaderProps.setOpenAddSimpleRestroomModal).toHaveBeenCalledWith(
      true,
    )
    rerender(
      <SessionProvider>
        <RestroomProvider>
          <Header
            {...mockHeaderProps}
            user={signedInUser}
            openAddSimpleRestroomModal={true}
          />
        </RestroomProvider>
      </SessionProvider>,
    )

    const modal = screen.getByRole('presentation')
    expect(within(modal).getByText('トイレ情報を登録する')).toBeInTheDocument()

    const imageFileButton = screen.getByRole('button', {
      name: '📁 ファイルから画像を選択 (必須)',
    })
    expect(imageFileButton).toBeInTheDocument()
    expect(imageFileButton).toHaveAttribute('type', 'button')
    const randomName = faker.company.name()

    const inputElementName = screen.getByLabelText('施設名称')
    expect(inputElementName).toBeInTheDocument()
    expect(inputElementName).toHaveAttribute('type', 'text')
    await userEvent.type(inputElementName, randomName)
    expect(inputElementName).toHaveValue(randomName)

    const randomAddress = faker.location.streetAddress()
    const inputElement = screen.getByLabelText('住所')
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveAttribute('type', 'text')
    await userEvent.type(inputElement, randomAddress)
    expect(inputElement).toHaveValue(randomAddress)

    const randomComment = faker.string.alphanumeric()
    const inputComment = screen.getByLabelText('コメント')
    expect(inputComment).toBeInTheDocument()
    expect(inputComment).toHaveAttribute('type', 'text')
    await userEvent.type(inputComment, randomComment)
    expect(inputComment).toHaveValue(randomComment)

    expect(within(modal).getByText('設備有無')).toBeInTheDocument()

    const nursingRoomCheckbox = screen.getByLabelText('授乳室')
    expect(nursingRoomCheckbox).toBeInTheDocument()
    expect(nursingRoomCheckbox).toHaveAttribute('name', 'nursing_room')
    expect(nursingRoomCheckbox).toHaveAttribute('type', 'checkbox')
    expect(nursingRoomCheckbox).not.toBeChecked()
    await userEvent.click(nursingRoomCheckbox)
    expect(nursingRoomCheckbox).toBeChecked()

    const anyoneToiletCheckbox = screen.getByLabelText('誰でもトイレ')
    expect(anyoneToiletCheckbox).toBeInTheDocument()
    expect(anyoneToiletCheckbox).toHaveAttribute('name', 'anyone_toilet')
    expect(anyoneToiletCheckbox).toHaveAttribute('type', 'checkbox')
    expect(anyoneToiletCheckbox).not.toBeChecked()
    await userEvent.click(anyoneToiletCheckbox)
    expect(anyoneToiletCheckbox).toBeChecked()

    const diaperChangingStationCheckbox = screen.getByLabelText('オムツ交換台')
    expect(diaperChangingStationCheckbox).toBeInTheDocument()
    expect(diaperChangingStationCheckbox).toHaveAttribute(
      'name',
      'diaper_changing_station',
    )
    expect(diaperChangingStationCheckbox).toHaveAttribute('type', 'checkbox')
    expect(diaperChangingStationCheckbox).not.toBeChecked()
    await userEvent.click(diaperChangingStationCheckbox)
    expect(diaperChangingStationCheckbox).toBeChecked()

    const powderCornerCheckbox = screen.getByLabelText('パウダーコーナー')
    expect(powderCornerCheckbox).toBeInTheDocument()
    expect(powderCornerCheckbox).toHaveAttribute('name', 'powder_corner')
    expect(powderCornerCheckbox).toHaveAttribute('type', 'checkbox')
    expect(powderCornerCheckbox).not.toBeChecked()
    await userEvent.click(powderCornerCheckbox)
    expect(powderCornerCheckbox).toBeChecked()

    const strollerAccessibleCheckbox = screen.getByLabelText('ベビーカー可')
    expect(strollerAccessibleCheckbox).toBeInTheDocument()
    expect(strollerAccessibleCheckbox).toHaveAttribute(
      'name',
      'stroller_accessible',
    )
    expect(strollerAccessibleCheckbox).toHaveAttribute('type', 'checkbox')
    expect(strollerAccessibleCheckbox).not.toBeChecked()
    await userEvent.click(strollerAccessibleCheckbox)
    expect(strollerAccessibleCheckbox).toBeChecked()

    const submitButton = screen.getByRole('button', { name: '送信する' })
    expect(submitButton).toBeInTheDocument()
    expect(submitButton).toHaveAttribute('type', 'submit')
    // debug(submitButton) // モーダルだけをデバッグ表示
  })

  it('Should show error when trying to submit without an image upload', async () => {
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
        <RestroomProvider>
          <Header {...mockHeaderProps} user={signedInUser} />
        </RestroomProvider>
      </SessionProvider>,
    )

    const menuButtons = screen.getAllByLabelText('menu')
    const addLocationButton = menuButtons[2]
    await userEvent.click(addLocationButton)

    expect(mockHeaderProps.setOpenAddSimpleRestroomModal).toHaveBeenCalledWith(
      true,
    )

    rerender(
      <SessionProvider>
        <RestroomProvider>
          <Header
            {...mockHeaderProps}
            user={signedInUser}
            openAddSimpleRestroomModal={true}
          />
        </RestroomProvider>
      </SessionProvider>,
    )

    const modal = screen.getByRole('presentation')
    expect(within(modal).getByText('トイレ情報を登録する')).toBeInTheDocument()

    const imageFileButton = screen.getByRole('button', {
      name: '📁 ファイルから画像を選択 (必須)',
    })
    expect(imageFileButton).toBeInTheDocument()
    await userEvent.click(imageFileButton)

    const submitButton = screen.getByRole('button', { name: '送信する' })
    await userEvent.click(submitButton)

    await waitFor(() => {
      expect(
        screen.queryByText('トイレの画像をアップロードしてください'),
      ).toBeInTheDocument()
    })
  })
})

import { faker } from '@faker-js/faker'
import { render, screen, waitFor, within } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import Header from './Header'
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

  it('Should open the modal and display the modal when the modal button is clicked', async () => {
    const { debug, rerender } = render(<Header {...mockHeaderProps} />)
    const menuButtons = screen.getAllByLabelText('menu')
    const addLocationButton = menuButtons[1]
    await userEvent.click(addLocationButton)
    expect(mockHeaderProps.setOpenAddSimpleRestroomModal).toHaveBeenCalledWith(
      true,
    )
    rerender(<Header {...mockHeaderProps} openAddSimpleRestroomModal={true} />)

    const modal = screen.getByRole('presentation') // モーダル要素を取得
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
    const { rerender } = render(<Header {...mockHeaderProps} />)

    const menuButtons = screen.getAllByLabelText('menu')
    const addLocationButton = menuButtons[1]
    await userEvent.click(addLocationButton)

    expect(mockHeaderProps.setOpenAddSimpleRestroomModal).toHaveBeenCalledWith(
      true,
    )

    rerender(<Header {...mockHeaderProps} openAddSimpleRestroomModal={true} />)

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

import { faker } from '@faker-js/faker'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { userEvent } from '@testing-library/user-event'
import DisplayModalWindowContainer from '@/containers/DisplayModalWindowContainer'
import EditRestroomContainer from '@/containers/EditRestroomContainer'
import { useRestroomContext } from '@/context/RestRoomContext'
import { useSessionContext } from '@/context/SessionContext'
import { AddRestroomFormData } from '@/interface/addRestroomFormDataInterface'
import { Restroom } from '@/interface/restroomInterface'

beforeEach(() => {
  jest.clearAllMocks()
})

jest.mock('react-awesome-stars-rating', () => ({
  __esModule: true,
  default: jest
    .fn()
    .mockImplementation(({ value }) => <div>ReactStarsRating {value}</div>),
}))

interface DisplayModalWindowProps extends Restroom {
  openModalWindow: boolean
  closeModalWindow: () => void
}

interface EditRestroomFormData extends AddRestroomFormData {
  id: number
}

let mockDisplayModalWindowProps: DisplayModalWindowProps
let mockEditRestroomContainerProps: EditRestroomFormData

beforeEach(() => {
  mockDisplayModalWindowProps = {
    openModalWindow: true,
    closeModalWindow: jest.fn(),
    name: faker.company.name(),
    address: faker.location.streetAddress(),
    content: faker.string.alphanumeric(),
    latitude: faker.number.float({ min: 139.76712, max: 139.76713 }),
    longitude: faker.number.float({ min: 35.68123, max: 35.68124 }),
    nursingRoom: faker.datatype.boolean(),
    anyoneToilet: faker.datatype.boolean(),
    diaperChangingStation: faker.datatype.boolean(),
    powderCorner: faker.datatype.boolean(),
    strollerAccessible: faker.datatype.boolean(),
    evaluation: faker.number.int({ min: 1, max: 5 }),
    image: '/public-toilet.jpeg',
    userId: 1,
  }

  mockEditRestroomContainerProps = {
    id: 1,
    name: mockDisplayModalWindowProps.name,
    address: mockDisplayModalWindowProps.address,
    content: mockDisplayModalWindowProps.content,
    latitude: faker.number.float({ min: 139.76712, max: 139.76713 }),
    longitude: faker.number.float({ min: 35.68123, max: 35.68124 }),
    nursing_room: faker.datatype.boolean(),
    anyone_toilet: faker.datatype.boolean(),
    diaper_changing_station: faker.datatype.boolean(),
    powder_corner: faker.datatype.boolean(),
    stroller_accessible: faker.datatype.boolean(),
    evaluation: faker.number.int({ min: 1, max: 5 }),
    createdAt: 'test',
  }
})

jest.mock('@/context/SessionContext', () => ({
  useSessionContext: jest.fn(),
}))

jest.mock('@/context/RestRoomContext', () => ({
  useRestroomContext: jest.fn(),
}))

describe('EditRestroom when from nursing_room to strollerAccessible true', () => {
  it('should display EditRestroom modal', async () => {
    const signedInUser = {
      id: 1,
      email: 'admin@example.com',
      isFetched: true,
      isSignedIn: true,
      app_metadata: {},
      user_metadata: {},
      aud: 'authenticated',
      created_at: '2023-01-01T00:00:00Z',
    }

    // mockRestroomの定義
    const mockRestroom = {
      id: 1,
      name: mockEditRestroomContainerProps.name,
      address: mockEditRestroomContainerProps.address,
      content: mockEditRestroomContainerProps.content,
      image: '/sample.jpg',
      latitude: 35.681236,
      longitude: 139.767125,
      createdAt: '2023-01-01',
      nursingRoom: true,
      anyoneToilet: true,
      diaperChangingStation: true,
      powderCorner: true,
      strollerAccessible: true,
      evaluation: mockEditRestroomContainerProps.evaluation,
      userId: 1,
    }

    //ログイン情報をモック
    useSessionContext.mockReturnValue({
      currentUser: signedInUser,
      setCurrentUser: jest.fn(),
    })

    //トイレ情報をモック
    useRestroomContext.mockReturnValue({
      selectedRestroom: mockRestroom,
      setSelectedRestroom: jest.fn(),
    })

    const { rerender } = render(
      <DisplayModalWindowContainer {...mockDisplayModalWindowProps} />,
    )

    const editButton = screen.getByRole('button', { name: '編集する' })
    expect(editButton).toBeInTheDocument()

    await userEvent.click(editButton)

    await waitFor(() => {
      rerender(
        <EditRestroomContainer
          {...mockEditRestroomContainerProps}
          open={true}
          onClose={jest.fn()}
        />,
      )
    })

    expect(screen.getByText('トイレ情報を編集する')).toBeInTheDocument()

    expect(screen.getByDisplayValue(mockRestroom.name)).toBeInTheDocument()
    const nameInput = screen.getByLabelText('施設名称')
    await userEvent.clear(nameInput) // フィールドをクリア
    await userEvent.type(nameInput, 'New Restroom Name')
    expect(screen.getByDisplayValue('New Restroom Name')).toBeInTheDocument()

    expect(screen.getByDisplayValue(mockRestroom.address)).toBeInTheDocument()
    const addressInput = screen.getByLabelText('住所')
    await userEvent.clear(addressInput)
    await userEvent.type(addressInput, '456 New Street')
    expect(screen.getByDisplayValue('456 New Street')).toBeInTheDocument()

    expect(screen.getByDisplayValue(mockRestroom.content)).toBeInTheDocument()
    const contentInput = screen.getByLabelText('コメント')
    await userEvent.clear(contentInput)
    await userEvent.type(contentInput, 'New Content')
    expect(screen.getByDisplayValue('New Content')).toBeInTheDocument()

    expect(screen.getByText('施設情報')).toBeInTheDocument()

    const nursingRoomCheckbox = screen.getByLabelText('授乳室')
    expect(nursingRoomCheckbox).toBeInTheDocument()
    expect(nursingRoomCheckbox).toHaveAttribute('name', 'nursing_room')
    expect(nursingRoomCheckbox).toHaveAttribute('type', 'checkbox')
    expect(nursingRoomCheckbox).toBeChecked()
    await userEvent.click(nursingRoomCheckbox)
    expect(nursingRoomCheckbox).not.toBeChecked()

    const anyoneToiletCheckbox = screen.getByLabelText('誰でもトイレ')
    expect(anyoneToiletCheckbox).toBeInTheDocument()
    expect(anyoneToiletCheckbox).toHaveAttribute('name', 'anyone_toilet')
    expect(anyoneToiletCheckbox).toHaveAttribute('type', 'checkbox')
    expect(anyoneToiletCheckbox).toBeChecked()
    await userEvent.click(anyoneToiletCheckbox)
    expect(anyoneToiletCheckbox).not.toBeChecked()

    const diaperChangingStationCheckbox = screen.getByLabelText('オムツ交換台')
    expect(diaperChangingStationCheckbox).toBeInTheDocument()
    expect(diaperChangingStationCheckbox).toHaveAttribute(
      'name',
      'diaper_changing_station',
    )
    expect(diaperChangingStationCheckbox).toHaveAttribute('type', 'checkbox')
    expect(diaperChangingStationCheckbox).toBeChecked()
    await userEvent.click(diaperChangingStationCheckbox)
    expect(diaperChangingStationCheckbox).not.toBeChecked()

    const powderCornerCheckbox = screen.getByLabelText('パウダーコーナー')
    expect(powderCornerCheckbox).toBeInTheDocument()
    expect(powderCornerCheckbox).toHaveAttribute('name', 'powder_corner')
    expect(powderCornerCheckbox).toHaveAttribute('type', 'checkbox')
    expect(powderCornerCheckbox).toBeChecked()
    await userEvent.click(powderCornerCheckbox)
    expect(powderCornerCheckbox).not.toBeChecked()

    const strollerAccessibleCheckbox = screen.getByLabelText('ベビーカー可')
    expect(strollerAccessibleCheckbox).toBeInTheDocument()
    expect(strollerAccessibleCheckbox).toHaveAttribute(
      'name',
      'stroller_accessible',
    )
    expect(strollerAccessibleCheckbox).toHaveAttribute('type', 'checkbox')
    expect(strollerAccessibleCheckbox).toBeChecked()
    await userEvent.click(strollerAccessibleCheckbox)
    expect(strollerAccessibleCheckbox).not.toBeChecked()

    const editButton2 = screen.getByRole('button', { name: '編集する' })
    expect(editButton2).toBeInTheDocument()
    expect(editButton2).toHaveAttribute('type', 'submit')

    const deleteButton = screen.getByRole('button', { name: '削除する' })
    expect(deleteButton).toBeInTheDocument()
  })
})

jest.setTimeout(15000)
describe('EditRestroom when from nursing_room to strollerAccessible false', () => {
  it('should display EditRestroom modal', async () => {
    const signedInUser = {
      id: 1,
      email: 'admin@example.com',
      isFetched: true,
      isSignedIn: true,
      app_metadata: {},
      user_metadata: {},
      aud: 'authenticated',
      created_at: '2023-01-01T00:00:00Z',
    }

    // mockRestroomの定義
    const mockRestroom = {
      id: 1,
      name: mockEditRestroomContainerProps.name,
      address: mockEditRestroomContainerProps.address,
      content: mockEditRestroomContainerProps.content,
      image: '/sample.jpg',
      latitude: 35.681236,
      longitude: 139.767125,
      createdAt: '2023-01-01',
      nursingRoom: false,
      anyoneToilet: false,
      diaperChangingStation: false,
      powderCorner: false,
      strollerAccessible: false,
      evaluation: mockEditRestroomContainerProps.evaluation,
      userId: 1,
    }

    //ログイン情報をモック
    useSessionContext.mockReturnValue({
      currentUser: signedInUser,
      setCurrentUser: jest.fn(),
    })

    //トイレ情報をモック
    useRestroomContext.mockReturnValue({
      selectedRestroom: mockRestroom,
      setSelectedRestroom: jest.fn(),
    })

    const { rerender } = render(
      <DisplayModalWindowContainer {...mockDisplayModalWindowProps} />,
    )

    const editButton = screen.getByRole('button', { name: '編集する' })
    expect(editButton).toBeInTheDocument()

    await userEvent.click(editButton)

    await waitFor(() => {
      rerender(
        <EditRestroomContainer
          {...mockEditRestroomContainerProps}
          open={true}
          onClose={jest.fn()}
        />,
      )
    })
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

    const editButton2 = screen.getByRole('button', { name: '編集する' })
    expect(editButton2).toBeInTheDocument()
    expect(editButton2).toHaveAttribute('type', 'submit')

    const deleteButton = screen.getByRole('button', { name: '削除する' })
    expect(deleteButton).toBeInTheDocument()
  })
})

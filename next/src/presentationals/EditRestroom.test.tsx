import { faker } from '@faker-js/faker'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { userEvent } from '@testing-library/user-event'
import { Restroom } from '@/interface/restroomInterface'
import { User } from '@/interface/userInterface'
import DisplayModalWindowContainer from '@/containers/DisplayModalWindowContainer'
import { SessionProvider } from '@/context/SessionContext'
import { RestroomProvider } from '@/context/RestRoomContext'

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

let mockDisplayModalWindowProps: DisplayModalWindowProps

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
  }
})

describe('EditRestroom', () => {
  it('should display EditRestroom modal', async () => {

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

    const { useSessionContext } = jest.requireMock('@/context/SessionContext')
    useSessionContext.mockReturnValue({ currentUser: signedInUser })

    // コンテナをレンダリング
    const { rerender, debug } = render(
      <SessionProvider>
        <RestroomProvider>
          <DisplayModalWindowContainer
            {...mockDisplayModalWindowProps}
          />
        </RestroomProvider>
      </SessionProvider>
    )

    // 「編集する」ボタンが表示されていることを確認
    const editButton = screen.getByText('編集する')
    expect(editButton).toBeInTheDocument()

    debug()
  
  })
})
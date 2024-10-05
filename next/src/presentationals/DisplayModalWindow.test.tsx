import { faker } from '@faker-js/faker'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { userEvent } from '@testing-library/user-event'
import { Restroom } from '@/interface/restroomInterface'
import { User } from '@/interface/userInterface'
import DisplayModalWindow from '@/presentationals/DisplayModalWindow'

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
  user: User | null
  openModalWindow: boolean
  closeModalWindow: () => void
  openEditRestroomModalWindow: () => void
}

let mockHeaderProps: DisplayModalWindowProps

beforeEach(() => {
  mockHeaderProps = {
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
    user: null,
    openModalWindow: true,
    closeModalWindow: jest.fn(),
    openEditRestroomModalWindow: jest.fn(),
  }
})

describe('Modal', () => {
  it('should display modal', () => {
    render(<DisplayModalWindow {...mockHeaderProps} />)

    const closeButton = screen.getByTestId('CloseIcon')
    expect(closeButton).toBeInTheDocument()

    const image = screen.getByAltText('restroom')

    expect(image).toBeInTheDocument()

    expect(image).toHaveAttribute(
      'src',
      '/_next/image?url=%2Fpublic-toilet.jpeg&w=640&q=75',
    )

    expect(image).toHaveAttribute('alt', 'restroom')

    expect(image).toHaveAttribute('width', '200')
    expect(image).toHaveAttribute('height', '200')

    expect(screen.getByText(mockHeaderProps.name)).toBeInTheDocument()

    expect(screen.getByText('住所')).toBeInTheDocument()
    expect(screen.getByText(mockHeaderProps.address)).toBeInTheDocument()

    expect(screen.getByText('コメント')).toBeInTheDocument()
    expect(screen.getByText(mockHeaderProps.content)).toBeInTheDocument()

    expect(screen.getByText('設備情報')).toBeInTheDocument()

    expect(screen.getByText('清潔度')).toBeInTheDocument()

    expect(
      screen.getByText(`ReactStarsRating ${mockHeaderProps.evaluation}`),
    ).toBeInTheDocument()

    expect(screen.getByText('お問い合わせはこちら ＞')).toBeInTheDocument()
  })

  it('should display "授乳室" when nursingRoom is true', () => {
    render(<DisplayModalWindow {...mockHeaderProps} nursingRoom={true} />)
    expect(screen.getByText('授乳室')).toBeInTheDocument()
  })

  it('should not display "授乳室" when nursingRoom is false', () => {
    render(<DisplayModalWindow {...mockHeaderProps} nursingRoom={false} />)
    expect(screen.queryByText('授乳室')).not.toBeInTheDocument()
  })

  it('should display "誰でもトイレ" when anyoneToilet is true', () => {
    render(<DisplayModalWindow {...mockHeaderProps} anyoneToilet={true} />)
    expect(screen.getByText('誰でもトイレ')).toBeInTheDocument()
  })

  it('should not display "誰でもトイレ" when anyoneToilet is false', () => {
    render(<DisplayModalWindow {...mockHeaderProps} anyoneToilet={false} />)
    expect(screen.queryByText('誰でもトイレ')).not.toBeInTheDocument()
  })

  it('should display "オムツ交換台" when diaperChangingStation is true', () => {
    render(
      <DisplayModalWindow {...mockHeaderProps} diaperChangingStation={true} />,
    )
    expect(screen.getByText('オムツ交換台')).toBeInTheDocument()
  })

  it('should not display "オムツ交換台" when diaperChangingStation is false', () => {
    render(
      <DisplayModalWindow {...mockHeaderProps} diaperChangingStation={false} />,
    )
    expect(screen.queryByText('オムツ交換台')).not.toBeInTheDocument()
  })

  it('should display "パウダーコーナー" when powderCorner is true', () => {
    render(<DisplayModalWindow {...mockHeaderProps} powderCorner={true} />)
    expect(screen.getByText('パウダーコーナー')).toBeInTheDocument()
  })

  it('should not display "パウダーコーナー" when powderCorner is false', () => {
    render(<DisplayModalWindow {...mockHeaderProps} powderCorner={false} />)
    expect(screen.queryByText('パウダーコーナー')).not.toBeInTheDocument()
  })

  it('should display "ベビーカー可" when strollerAccessible is true', () => {
    render(
      <DisplayModalWindow {...mockHeaderProps} strollerAccessible={true} />,
    )
    expect(screen.getByText('ベビーカー可')).toBeInTheDocument()
  })

  it('should not display "ベビーカー可" when strollerAccessible is false', () => {
    render(
      <DisplayModalWindow {...mockHeaderProps} strollerAccessible={false} />,
    )
    expect(screen.queryByText('ベビーカー可')).not.toBeInTheDocument()
  })

  it('should not display modal when closeButton is clicked', async () => {
    const closeModalWindowMock = jest.fn(() => {
      mockHeaderProps.openModalWindow = false
    })

    const { rerender } = render(
      <DisplayModalWindow
        {...mockHeaderProps}
        closeModalWindow={closeModalWindowMock}
      />,
    )

    expect(screen.getByRole('presentation')).toBeInTheDocument()

    const closeButton = screen.getByTestId('closeButton')
    expect(closeButton).toBeInTheDocument()

    await userEvent.click(closeButton)

    rerender(<DisplayModalWindow {...mockHeaderProps} />)

    await waitFor(() => {
      expect(screen.queryByRole('presentation')).not.toBeInTheDocument()
    })
  })
})

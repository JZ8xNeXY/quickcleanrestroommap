import { faker } from '@faker-js/faker'
import { render, screen, within, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import { userEvent } from '@testing-library/user-event'
import AddRestroomContainer from '@/containers/AddRestroomContainer'
import { RestroomProvider } from '@/context/RestRoomContext'
import { SessionProvider } from '@/context/SessionContext'

// camelcase-keys のモックの作成
jest.mock('camelcase-keys', () => ({
  default: jest.fn().mockReturnValue({}),
}))

beforeAll(() => {
  global.google = {
    maps: {
      Map: jest.fn().mockImplementation(() => ({
        setCenter: jest.fn(),
        setZoom: jest.fn(),
        addListener: jest.fn(),
      })),
      LatLng: jest.fn(),
      Marker: jest.fn(),
      event: {
        addListener: jest.fn(),
      },
    },
  }
})

describe('AddRestroom', () => {
  it('should not display AddRestroom modal when open is false', async () => {
    await act(async () => {
      render(
        <SessionProvider>
          <RestroomProvider>
            <AddRestroomContainer
              open={false}
              onClose={() => jest.fn()}
              coords={{ lat: 35.681236, lng: 139.767125 }}
            />
          </RestroomProvider>
        </SessionProvider>,
      )
    })

    expect(screen.queryByRole('presentation')).not.toBeInTheDocument()
  })

  it('should display AddRestroom modal when open is true', async () => {
    await act(async () => {
      render(
        <SessionProvider>
          <RestroomProvider>
            <AddRestroomContainer
              open={true}
              onClose={() => jest.fn()}
              coords={{ lat: 35.681236, lng: 139.767125 }}
            />
          </RestroomProvider>
        </SessionProvider>,
      )
    })

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
  })

  it('Should show error when trying to submit without an image upload', async () => {
    await act(async () => {
      render(
        <SessionProvider>
          <RestroomProvider>
            <AddRestroomContainer
              open={true}
              onClose={() => jest.fn()}
              coords={{ lat: 35.681236, lng: 139.767125 }}
            />
          </RestroomProvider>
        </SessionProvider>,
      )
    })

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

import { render, screen, waitFor, act } from '@testing-library/react'
import Footer from '@/presentationals/Footer'
import '@testing-library/jest-dom'
import { SessionProvider } from '@/context/SessionContext'
import { RestroomProvider } from '@/context/RestRoomContext'

describe('Footer', () => {
  it('should display "Copyright © Quick Clean Restroom Map All rights reserved."', async () => {
    await act(async () => {
      render(
        <SessionProvider>
          <RestroomProvider>
            <Footer />
          </RestroomProvider>
        </SessionProvider>,
      )
    })

    await waitFor(() =>
      expect(
        screen.getByText(
          'Copyright © Quick Clean Restroom Map All rights reserved.',
        ),
      ).toBeInTheDocument(),
    )
  })
})

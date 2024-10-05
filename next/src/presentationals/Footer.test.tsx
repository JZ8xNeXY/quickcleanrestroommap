import { render, screen } from '@testing-library/react'
import Footer from './Footer' 
import '@testing-library/jest-dom'

describe('Footer', () => {
  it('should display "Copyright © Quick Clean Restroom Map All rights reserved."', () => {
    render(<Footer />)

    expect(
      screen.getByText(
        'Copyright © Quick Clean Restroom Map All rights reserved.',
      ),
    ).toBeInTheDocument()

  })
})
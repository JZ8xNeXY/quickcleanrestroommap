import { render, screen, act } from '@testing-library/react'
import Index from '@/pages/index'
import '@testing-library/jest-dom'

jest.mock('camelcase-keys', () => ({
  default: jest.fn().mockReturnValue({}),
}))

describe('Index', () => {
  it('Should display "map"', async () => {
    await act(async () => {
      render(<Index />)
    })

    expect(screen.getByTestId('map')).toBeInTheDocument()
  })
})

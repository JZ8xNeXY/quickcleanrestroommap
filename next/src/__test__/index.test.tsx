import { render, screen, act } from '@testing-library/react'
import Index from '@/pages/index'
import '@testing-library/jest-dom'

afterEach(() => {
  jest.resetAllMocks()
})

jest.mock('camelcase-keys', () => ({
  default: jest.fn().mockReturnValue({}),
}))

jest.mock('next/router', () => ({
  useRouter() {
    return { push: jest.fn() }
  },
}))

describe('Index', () => {
  it('Should display "map"', async () => {
    await act(async () => {
      render(<Index />)
    })

    expect(screen.getByTestId('map')).toBeInTheDocument()
  })
})

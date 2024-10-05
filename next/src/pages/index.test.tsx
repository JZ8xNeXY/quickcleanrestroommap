import { render, screen } from '@testing-library/react'
import Index from '@/pages/index'
import '@testing-library/jest-dom'

//camelcase-keysのモックの作成
jest.mock('camelcase-keys', () => ({
  default: jest.fn().mockReturnValue({}),
}))

describe('Index', () => {
  it('Should display "map,"', () => {
    render(<Index />)

    expect(screen.getByTestId('map')).toBeTruthy()
  })
})

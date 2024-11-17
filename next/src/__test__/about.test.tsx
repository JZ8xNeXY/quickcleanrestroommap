import { render, screen } from '@testing-library/react'
import About from '@/pages/about'
import '@testing-library/jest-dom'

jest.mock('camelcase-keys', () => ({
  default: jest.fn().mockReturnValue({}),
}))

describe('About', () => {
  it('Should display "title,card,text,map,"', () => {
    render(<About />)

    expect(screen.getByText('Quick Clean Restroom Map で')).toBeInTheDocument()
    expect(screen.getByText('きれいなトイレを見つけよう')).toBeInTheDocument()

    expect(screen.getByText('\\ P O I N T /')).toBeInTheDocument()

    expect(screen.getByText('\\ P O I N T 1 /')).toBeInTheDocument()
    expect(screen.getByText('\\ P O I N T 2 /')).toBeInTheDocument()
    expect(screen.getByText('\\ P O I N T 3 /')).toBeInTheDocument()

    expect(screen.getByText('\\ S E A R C H /')).toBeInTheDocument()

    expect(screen.getByTestId('map')).toBeInTheDocument()
  })
})

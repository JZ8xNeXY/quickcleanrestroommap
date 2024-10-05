import { render, screen } from '@testing-library/react'
import TermOfUse from '@/pages/termsofuse' 

describe('TermOfUse', () => {
  it('Should display "利用規約"', () => {
    render(<TermOfUse />)

    const titleElement = screen.getByRole('heading', {
      name: 'サービス利用規約',
    })
    expect(titleElement).toBeInTheDocument()
  })
})

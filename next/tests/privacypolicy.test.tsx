import { render, screen } from '@testing-library/react'
import PrivacyPolicy from '@/pages/privacypolicy'
import '@testing-library/jest-dom/'

describe('PrivacyPolicy', () => {
  it('Should display "プライバシーポリシー 第1条 第2条', () => {
    render(<PrivacyPolicy />)

    const titleElement = screen.getByRole('heading', {
      name: 'プライバシーポリシー',
    })
    expect(titleElement).toBeInTheDocument()

    const firstParagraph = screen.getByRole('heading', {
      name: '第1条（お客様から取得する情報）',
    })
    expect(firstParagraph).toBeInTheDocument()

    const secondParagraph = screen.getByRole('heading', {
      name: '第2条（お客様の情報を利用する目的）',
    })
    expect(secondParagraph).toBeInTheDocument()
  })
})

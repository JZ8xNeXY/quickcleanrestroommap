import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { SessionProvider } from '@/context/SessionContext'
import SignIn from '@/pages/sign_in'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

describe('SignIn', () => {
  it('Should display "the sign in form with email, password and submit button"', () => {
    render(
      <SessionProvider>
        <SignIn />
      </SessionProvider>,
    )

    const signInText = screen.getByText('Sign in')
    expect(signInText).toBeInTheDocument()

    const emailInput = screen.getByLabelText(/メールアドレス/i)
    expect(emailInput).toBeInTheDocument()

    const passwordInput = screen.getByLabelText(/パスワード/i, {
      selector: 'input',
    })
    expect(passwordInput).toBeInTheDocument()

    const submitButton = screen.getByRole('button', { name: '送信する' })
    expect(submitButton).toBeInTheDocument()
  })
})

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { SessionProvider } from '@/context/SessionContext'
import SignUp from '@/pages/sign_up'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

describe('SignUp', () => {
  it('Should display "the sign up form with email, password , confirmed password and submit button"', () => {
    render(
      <SessionProvider>
        <SignUp />
      </SessionProvider>,
    )

    const signUpText = screen.getByText('Sign Up')
    expect(signUpText).toBeInTheDocument()

    const emailInput = screen.getByLabelText(/メールアドレス/i)
    expect(emailInput).toBeInTheDocument()

    const passwordInput = screen.getAllByText(/パスワード/i)[0] //Todo
    expect(passwordInput).toBeInTheDocument()

    const confirmedPasswordInput = screen.getAllByText(/確認用パスワード/i)[0] //Todo
    expect(confirmedPasswordInput).toBeInTheDocument()

    const submitButton = screen.getByRole('button', { name: '登録する' })
    expect(submitButton).toBeInTheDocument()
  })
})

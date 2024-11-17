import { faker } from '@faker-js/faker'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { userEvent } from '@testing-library/user-event'
import { SessionProvider } from '@/context/SessionContext'
import SignIn from '@/pages/sign_in'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

describe('SignIn', () => {
  it('Should display "the sign in form with email, password and submit button"', async () => {
    render(
      <SessionProvider>
        <SignIn />
      </SessionProvider>,
    )

    const signInText = screen.getByText('Sign in')
    expect(signInText).toBeInTheDocument()

    const emailInput = screen.getByLabelText(/メールアドレス/i)
    expect(emailInput).toBeInTheDocument()
    expect(emailInput).toHaveAttribute('type', 'text')
    const randomEmail = faker.internet.email()
    await userEvent.type(emailInput, randomEmail)
    expect(emailInput).toHaveValue(randomEmail)

    const passwordInput = screen.getByLabelText(/パスワード/i, {
      selector: 'input',
    })
    expect(passwordInput).toBeInTheDocument()
    expect(passwordInput).toHaveAttribute('type', 'password')
    const randomPassword = faker.internet.password()
    await userEvent.type(passwordInput, randomPassword)
    expect(passwordInput).toHaveValue(randomPassword)

    const submitButton = screen.getByRole('button', { name: '送信する' })
    expect(submitButton).toBeInTheDocument()
  })
})

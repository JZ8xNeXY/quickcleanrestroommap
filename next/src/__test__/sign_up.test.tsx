import { faker } from '@faker-js/faker'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { userEvent } from '@testing-library/user-event'
import { SessionProvider } from '@/context/SessionContext'
import SignUp from '@/pages/sign_up'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

describe('SignUp', () => {
  it('Should display "the sign up form with email, password , confirmed password and submit button"', async () => {
    render(
      <SessionProvider>
        <SignUp />
      </SessionProvider>,
    )

    const signUpText = screen.getByText('Sign Up')
    expect(signUpText).toBeInTheDocument()

    const emailInput = screen.getByLabelText(/メールアドレス/i)
    expect(emailInput).toBeInTheDocument()
    expect(emailInput).toHaveAttribute('type', 'text')
    const randomEmail = faker.internet.email()
    await userEvent.type(emailInput, randomEmail)
    expect(emailInput).toHaveValue(randomEmail)

    const passwordInput = screen.getByTestId('password-input')
    expect(passwordInput).toBeInTheDocument()
    expect(passwordInput).toHaveAttribute('type', 'password')
    const randomPassword = faker.internet.password()
    await userEvent.type(passwordInput, randomPassword)
    expect(passwordInput).toHaveValue(randomPassword)

    const confirmedPasswordInput = screen.getByTestId(
      'confirmed-password-input',
    )
    expect(confirmedPasswordInput).toBeInTheDocument()
    expect(confirmedPasswordInput).toHaveAttribute('type', 'password')
    await userEvent.type(confirmedPasswordInput, randomPassword)
    expect(confirmedPasswordInput).toHaveValue(randomPassword)

    const submitButton = screen.getByRole('button', { name: '登録する' })
    expect(submitButton).toBeInTheDocument()
  })
})

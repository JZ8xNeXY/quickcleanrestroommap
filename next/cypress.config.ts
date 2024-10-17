import { defineConfig } from 'cypress'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.test' })

export default defineConfig({
  projectId: 'xv9nv1',
  e2e: {
    supportFile: 'cypress/support/commands.ts',
    video: true,
    screenshotOnRunFailure: true,
  },
  env: {
    baseUrl: process.env.BASE_URL,
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
  },
})

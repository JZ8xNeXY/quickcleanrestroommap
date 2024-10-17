import { defineConfig } from 'cypress'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.production' })

export default defineConfig({
  projectId: 'xv9nv1',
  e2e: {
    supportFile: 'cypress/support/commands.ts',
    video: true,
    screenshotOnRunFailure: true,
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_API_KEY: process.env.NEXT_PUBLIC_SUPABASE_API_KEY,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
    baseUrl: process.env.BASE_URL,
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
  },
})

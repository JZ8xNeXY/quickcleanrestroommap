import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'xv9nv1',
  e2e: {
    baseUrl: 'http://localhost:8000',
    supportFile: 'cypress/support/commands.ts',
    video: true,
    screenshotOnRunFailure: true,
  },
})

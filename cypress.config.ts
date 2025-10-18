import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173/Rick-and-Morty/',
    specPattern: 'cypress/e2e/**/*.cy.{ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
  },

  viewportWidth: 1280,
  viewportHeight: 800,
  video: false,
  screenshotOnRunFailure: true,
  retries: {
    runMode: 1,
    openMode: 0,
  },
  fileServerFolder: '.',
});

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@Components/(.*)$': '<rootDir>/src/Components/$1',
    '^@Pages/(.*)$': '<rootDir>/src/Pages/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@Widget/(.*)$': '<rootDir>/src/Widget/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/__tests__/**/*.(ts|tsx)', '**/*.(test|spec).(ts|tsx)'],
};

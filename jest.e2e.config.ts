import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage/e2e',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!**/__tests__/**'],
  setupFiles: ['<rootDir>/src/__tests__/config/setup.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/config/setup-after-env.ts'],
  testMatch: ['**/__tests__/e2e/**/*.test.ts'],
  moduleNameMapper: {
    '@/(.+)': '<rootDir>/src/$1',
  },
  testTimeout: 20000,
};

export default config;

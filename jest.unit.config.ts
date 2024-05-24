import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage/unit',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!**/__tests__/**'],
  testMatch: ['**/tests/unit/**/*.spec.ts'],
  moduleNameMapper: {
    '@/(.+)': '<rootDir>/src/$1',
    '^mongoose$': '<rootDir>/__mocks__/mongoose.ts',
  },
  testTimeout: 20000,
};

export default config;

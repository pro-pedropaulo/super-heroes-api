import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage/unit',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!**/__tests__/**'],
  testMatch: ['**/__tests__/unit/**/*.test.ts'],
  moduleNameMapper: {
    '@/(.+)': '<rootDir>/src/$1',
  },
  testTimeout: 20000,
};

export default config;

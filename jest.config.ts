import type { Config } from 'jest';

const config: Config = {
  coverageReporters: [
    'lcov',
    [
      'text',
      {
        skipFull: true,
      },
    ],
  ],
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],
};

export default config;

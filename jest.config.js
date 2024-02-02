/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  modulePathIgnorePatterns: ['<rootDir>/lib/'],
  transform: {
    '^.+\\.ts?$': [
      'ts-jest',
      {
        diagnostics: false,
      },
    ],
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
};
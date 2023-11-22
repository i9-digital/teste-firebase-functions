module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testRegex: '.spec\\.(ts|js)x?$',
  coverageDirectory: 'coverage',
  modulePathIgnorePatterns: ['src/mocks'],
  coveragePathIgnorePatterns: ['src/mocks'],
  collectCoverageFrom: [
    'src/*/.{ts,tsx,js,jsx}',
    '!src/*/.d.ts',
    '!src/**/app.ts',
    '!src/**/server.ts'
  ],
  coverageReporters: ['json', 'text', 'lcov', 'clover', 'cobertura'],
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter/dist',
      {
        pageTitle: 'Test Report',
        outputPath: '.reports/test-report.html',
      },
    ],
    [
      'jest-junit',
      {
        suiteName: 'jest tests',
        outputDirectory: '.reports',
        outputName: 'test-report.xml',
        uniqueOutputName: 'false',
        classNameTemplate: '{classname}-{title}',
        titleTemplate: '{classname}-{title}',
        ancestorSeparator: ' > ',
        usePathForSuiteName: 'true',
      },
    ],
  ]
}
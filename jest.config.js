module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/jest/setupTests.ts'],
  testMatch: ['**/*.test.ts?(x)'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  modulePaths: ['<rootDir>/src', '<rootDir>/node_modules'],
  globals: {
    NODE_ENV: 'test',
  },
  verbose: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transformIgnorePatterns: ['/node_modules/(?!(lodash-es|react)/)'], // <-- this allows babel to load only the node modules I need (which is lodash-es) and ignore the rest
  moduleNameMapper: {
    'aurelia-(.*)': '<rootDir>/node_modules/$1',
  },
  // some coverage and results processing options
  collectCoverage: true,
  collectCoverageFrom: [
    'src/components/**/*.ts?(x)',
    'src/components/**/*.js?(x)',
    'src/reducers/**/*.ts?(x)',
    'src/reducers/**/*.js?(x)',
  ],
  coverageDirectory: './coverage',
  cacheDirectory: './tmp/',
  coverageReporters: ['json', 'lcov', 'text'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
};

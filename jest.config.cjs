// jest.config.cjs

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupJest.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^./apiConfig$': '<rootDir>/__mocks__/apiConfig.ts',
    '^apiConfig$': '<rootDir>/__mocks__/apiConfig.ts',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  transformIgnorePatterns: ['/node_modules/'],
};

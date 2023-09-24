/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testRegex: '(.*\\.(test|spec))\\.[jt]sx?$',
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};

// eslint-disable-next-line no-undef
module.exports = config;

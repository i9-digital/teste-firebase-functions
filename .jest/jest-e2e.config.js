const config = require('./jest-default')

module.exports = {
  ...config,
  testRegex: 'e2e\\.spec\\.(ts|js)x?$',
}
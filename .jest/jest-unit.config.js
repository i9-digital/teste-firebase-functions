const config = require('./jest-default')

module.exports = {
  ...config,
  testRegex: 'unit\\.spec\\.(ts|js)x?$',
}
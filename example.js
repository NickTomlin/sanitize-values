var sanitizeObject = require('sanitize-values')
var assert = require('assert')

var blacklist = ['secretNumber', 'ssn']
var data = {
  firstName: 'Bob',
  lastName: 'Bobbins',
  address: {
    lineOne: '123 Imaginary Way',
    secretNumber: '777'
  },
  ssn: '666-22-2432'
}

var sanitized = sanitizeObject(data, blacklist)

assert.deepEqual(sanitized, {
  firstName: 'Bob',
  lastName: 'Bobbins',
  address: {
    lineOne: '123 Imaginary Way',
    secretNumber: '[FILTERED]'
  },
  ssn: '[FILTERED]'
})

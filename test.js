'use strict'

var assert = require('assert')
var sanitizeObject = require('./index')

assert.deepEqual(sanitizeObject({
  ssn: '666-55-2322'
}, ['ssn']), {
  ssn: '[FILTERED]'
}, 'Did not properly sanitize sensitive key')

assert.deepEqual(sanitizeObject({
  ssn: '666-55-2322',
  deeply: {
    okay: 'value',
    nested: {
      normal: 'value',
      ssn: '666-55-2322'
    }
  }
}, ['ssn']), {
  ssn: '[FILTERED]',
  deeply: {
    okay: 'value',
    nested: {
      normal: 'value',
      ssn: '[FILTERED]'
    }
  }
}, 'Did not properly deeply nested objects')

assert.deepEqual(sanitizeObject({
  deeply: {
    okay: 'value',
    arrayed: [
      {
        normal: 'normal',
        ssn: '666-22-2432'
      }
    ]
  }
}, ['ssn']), {
  deeply: {
    okay: 'value',
    arrayed: [
      {
        normal: 'normal',
        ssn: '[FILTERED]'
      }
    ]
  }
}, 'Did not properly handle arrays')

var unmutatedSource = {
  ssn: '666-55-2322',
  deeply: {
    okay: 'value',
    nested: {
      normal: 'value',
      ssn: '666-55-2322'
    }
  }
}

sanitizeObject(unmutatedSource, ['ssn'])
assert.deepEqual(unmutatedSource, {
  ssn: '666-55-2322',
  deeply: {
    okay: 'value',
    nested: {
      normal: 'value',
      ssn: '666-55-2322'
    }
  }
}, 'Mutated source object')

assert.deepEqual(sanitizeObject({
  ssn: '666-55-2322',
  deeply: {
    danger: 'value',
    nested: {
      normal: 'value',
      ssn: '666-55-2322'
    }
  }
}, ['ssn', 'danger']), {
  ssn: '[FILTERED]',
  deeply: {
    danger: '[FILTERED]',
    nested: {
      normal: 'value',
      ssn: '[FILTERED]'
    }
  }
}, 'Properly handles multiple blacklist items')

assert.deepEqual(sanitizeObject({
  ssn: '666-55-2322',
  uhOh: null,
  arrayOfNull: [null, 1]
}, ['ssn']), {
  ssn: '[FILTERED]',
  uhOh: null,
  arrayOfNull: [null, 1]
}, 'Replaces the values of sensitive keys')

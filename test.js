var assert = require('assert');
var sanitizeObject = require('./index');

assert.deepEqual(sanitizeObject({
  ssn: '666-55-2322'
}, ['ssn']), {
  ssn: '[FILTERED]'
}, 'Did not properly sanitize sensitive key');

assert.deepEqual(sanitizeObject({
  ssn: '666-55-2322',
  deeply: {
    okay: 'value',
    nested: {
      normal: 'value',
      ssn: '666-55-2322'
    }
  }
}, ['ssn']) , {
  ssn:  '[FILTERED]',
  deeply: {
    okay: 'value',
    nested: {
      normal: 'value',
      ssn: '[FILTERED]'
    }
  }
}, 'did not properly deeply nested objects');

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
  ssn:  '[FILTERED]',
  deeply: {
    danger: '[FILTERED]',
    nested: {
      normal: 'value',
      ssn: '[FILTERED]'
    }
  }
}, 'properly handles multiple blacklist items');

assert.deepEqual(sanitizeObject({
  ssn: '666-55-2322',
  uhOh: null,
  arrayOfNull: [null, 1]
}, ['ssn']), {
  ssn: '[FILTERED]',
  uhOh: null,
  arrayOfNull: [null, 1]
}, 'replaces the values of sensitive keys');

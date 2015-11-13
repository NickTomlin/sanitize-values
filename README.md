sanitize-values
===

Sanitize sensitive properties of an object.

``` shell
npm i sanitize-values
```

# Usage

```javascript
var sanitizeObject = require('sanitize-object')

var data = {
  firstName: 'Bob',
  lastName: 'Bobbins',
  ssn: '666-22-2432'
}

sanitizeObject(data, ['ssn'])

/*
{
  firstName: 'Bob',
  lastName: 'Bobbins',
  ssn: '[FILTERED]'
}
*/
```

# Contributing

After cloning this repository:

```
npm i

# run the tests
npm t
```

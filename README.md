sanitize-values
===

[![Build Status](http://img.shields.io/travis/NickTomlin/sanitize-values.svg?style=flat&branch=master)](https://travis-ci.org/NickTomlin/sanitize-values)
![NPM package](https://img.shields.io/npm/v/sanitize-values.svg)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

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

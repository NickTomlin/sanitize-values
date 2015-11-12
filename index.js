'use strict';

var FILTERED_VALUE = '[FILTERED]';

function isObjectLike (x) { return x !== null && typeof x == 'object'; }

module.exports = function objectFilter (obj, blacklist) {
  if (isObjectLike(obj)) {
    for (var prop in obj) {
      if (isObjectLike(obj[prop])) {
        objectFilter(obj[prop], blacklist);
      } else if (blacklist.indexOf(prop) !== -1) {
        obj[prop] = FILTERED_VALUE;
      }
    }
  }

  return obj;
};

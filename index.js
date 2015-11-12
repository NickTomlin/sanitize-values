'use strict';

var FILTERED_VALUE = '[FILTERED]';

function isObjectLike (x) { return x !== null && typeof x == 'object'; }

function filter (obj, blacklist, accum) {
  if (isObjectLike(obj)) {
    for (var prop in obj) {
      if (isObjectLike(obj[prop])) {
        accum[prop] = {};
        filter(obj[prop], blacklist, accum[prop]);
      } else if (blacklist.indexOf(prop) !== -1) {
        accum[prop] = FILTERED_VALUE;
      } else {
        accum[prop] = obj[prop];
      }
    }
  }

  return accum;
}

module.exports = function (obj, blacklist) {
  return filter(obj, blacklist, {});
};

'use strict';

const test = require('ava');
const objectUtil = require('../../../lib/util/object-util');

test('flattenArray(): should return an empty array', t => {
  const result = objectUtil.flattenArray('keyZ', {});

  t.true(Array.isArray(result));
  t.is(result.length, 0);
});

test('flattenArray(): should return an array of values associated with key', t => {
  const result = objectUtil.flattenArray('keyA', {
    keyA: ['alpha', 'bravo', 'zulu'],
    keyB: [{keyC: 'lima', keyA: ['alpha', 'zulu', 'kilo']}, {keyD: 'hotel', keyA: null}]
  });

  t.true(Array.isArray(result));
  t.deepEqual(result, [
    'alpha',
    'bravo',
    'zulu',
    'alpha',
    'zulu',
    'kilo'
  ]);
});

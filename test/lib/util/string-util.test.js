'use strict';

const test = require('ava');
const stringUtil = require('../../../lib/util/string-util');

test('mprepend(): should return an empty array', t => {
  const result = stringUtil.mprepend([], 'golf hotel ');

  t.true(Array.isArray(result));
  t.is(result.length, 0);
});

test('mprepend(): should return an array of strings with data prepended to each', t => {
  t.deepEqual(stringUtil.mprepend(['bravo', 'foxtrot'], 'golf hotel '), ['golf hotel bravo', 'golf hotel foxtrot']);
});

test('padEnd(): should return the provided string', t => {
  t.is(stringUtil.padEnd('mike', 2, '#'), 'mike');
});

test('padEnd(): should return a string with padding applied to the end', t => {
  t.is(stringUtil.padEnd('yankee', 14), 'yankee        ');
  t.is(stringUtil.padEnd('oscar', 10, '*'), 'oscar*****');
});

test('padStart(): should return the provided string', t => {
  t.is(stringUtil.padStart('romeo', 3, '@'), 'romeo');
});

test('padStart(): should return a string with padding applied to the start', t => {
  t.is(stringUtil.padStart('whiskey', 9), '  whiskey');
  t.is(stringUtil.padStart('delta', 9, '!'), '!!!!delta');
});

test('prepend(): should return a string with data prepended', t => {
  t.is(stringUtil.prepend('bravo', 'golf hotel '), 'golf hotel bravo');
});

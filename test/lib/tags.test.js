'use strict';

const test = require('ava');
const Tags = require('../../lib/tags');

test('maxLength: should return the max length of the keys', t => {
  const tags = new Tags();

  tags.add('bravo', 2);
  t.is(tags.maxLength, 5);
});

test('add(): should update the max length of the keys', t => {
  const tags = new Tags();

  tags.add('tango', 4);
  t.is(tags.maxLength, 5);
  tags.add('foxtrot', 9);
  t.is(tags.maxLength, 7);
});

test('add(): should add key-value pair', t => {
  const key = 'india';
  const tags = new Tags();

  t.is(tags.get(key), null);
  tags.add(key, 9);
  t.is(tags.get(key), 9);
});

test('add(): should add value to the count associated to key', t => {
  const key = 'november';
  const tags = new Tags();

  tags.add(key, 1);
  t.is(tags.get(key), 1);
  tags.add(key, 14);
  t.is(tags.get(key), 15);
});

test('get(): should return null', t => {
  const tags = new Tags();

  t.is(tags.get('juliet'), null);
});

test('get(): should return the count associated to key', t => {
  const key = 'lima';
  const tags = new Tags();
  const val = 8;

  tags.add(key, val);
  t.is(tags.get(key), val);
});

test('sort(): should return an array of objects sorted in ascending order', t => {
  const tags = new Tags();

  tags.add('oscar', 6);
  tags.add('romeo', 2);
  tags.add('victor', 6);

  t.deepEqual(tags.sort(), [
    {name: 'romeo', count: 2},
    {name: 'oscar', count: 6},
    {name: 'victor', count: 6}
  ]);
});

test('sort(): should return an array of objects sorted in descending order', t => {
  const tags = new Tags();

  tags.add('whiskey', 8);
  tags.add('charlie', 1);
  tags.add('zulu', 5);

  t.deepEqual(tags.sort(false), [
    {name: 'whiskey', count: 8},
    {name: 'zulu', count: 5},
    {name: 'charlie', count: 1}
  ]);
});

test('toString(): should return an array of objects sorted in ascending order represented as a string', t => {
  const tags = new Tags();

  tags.add('golf', 12);
  tags.add('hotel', 9);

  t.is(tags.toString(), 'hotel  9\ngolf   12\n');
});

test('toString(): should return an array of objects sorted in descending order represented as a string', t => {
  const tags = new Tags();

  tags.add('mike', 11);
  tags.add('xray', 5);

  t.is(tags.toString(false), 'mike  11\nxray  5\n');
});

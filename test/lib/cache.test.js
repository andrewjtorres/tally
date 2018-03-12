'use strict';

const fs = require('fs');
const path = require('path');
const sinon = require('sinon');
const test = require('ava');
const Cache = require('../../lib/cache');
const log = require('../../lib/log');
const {flattenArray} = require('../../lib/util/object-util');

const dataDir = 'data-dir';
const files = [];

/**
 * Returns an array of merged values
 * @param {Array}  arr
 * @param {Object} data
 * @returns {Array}
 */
function testFormatter(arr, data) {
  const acc = arr === null ? [] : arr;

  return acc.concat(flattenArray('keyA', data));
}

test.before(() => {
  sinon.stub(fs, 'readFile');
  sinon.stub(fs, 'readdir');
  sinon.stub(log, 'error').callsFake(() => (true));

  let file = 'file-a.json';
  files.push(file);
  fs.readFile.withArgs(`${dataDir}${path.sep}${file}`, 'utf-8', sinon.match.func)
    .callsArgWithAsync(2, null, JSON.stringify({
      keyA: ['foxtrot', 'golf'],
      keyB: [{keyD: 'oscar', keyA: ['quebec']}, {keyD: 'foxtrot', keyA: null}]
    }));

  file = 'file-b.json';
  files.push(file);
  fs.readFile.withArgs(`${dataDir}${path.sep}${file}`, 'utf-8', sinon.match.func)
    .callsArgWithAsync(2, null, 'november');

  file = 'file-c.json';
  files.push(file);
  fs.readFile.withArgs(`${dataDir}${path.sep}${file}`, 'utf-8', sinon.match.func)
    .callsArgWithAsync(2, null, JSON.stringify({
      keyA: ['alpha'],
      keyC: 'echo'
    }));

  fs.readdir.withArgs(dataDir, sinon.match.func).callsArgWithAsync(1, null, files);

  fs.readFile.withArgs('file-m.json', 'utf-8', sinon.match.func)
    .callsArgWithAsync(2, new Error('no such file or directory'));
  fs.readFile.withArgs('file-n.json', 'utf-8', sinon.match.func)
    .callsArgWithAsync(2, null, JSON.stringify({keyA: 'yankee'}));
});

test('get(): should return null', t => {
  const cache = new Cache();

  t.is(cache.get('keyZ'), null);
});

test('get(): should return an object containing the key-value pair', t => {
  const cache = new Cache();
  const key = 'keyA';
  const val = ['sierra'];

  cache.set(key, val);
  t.deepEqual(cache.get(key), {[key]: val});
});

test('mset(): should set the keys to the provided values', t => {
  const cache = new Cache();
  const vals = {
    keyA: {keyD: 4},
    keyB: 'oscar',
    keyC: ['kilo']
  };
  const keys = Object.keys(vals);
  const {length} = keys;

  cache.mset(keys, vals);

  for (let i = 0; i < length; ++i) {
    t.deepEqual(cache.get(keys[i]), {[keys[i]]: vals[keys[i]]});
  }
});

test('set(): should set the key to the provided value', t => {
  const cache = new Cache();
  const key = 'keyA';
  const val = 'tango';

  cache.set(key, val);
  t.deepEqual(cache.get(key), {[key]: val});
});

test.cb('load(): should load the files from the data directory', t => {
  const key = 'keyA';
  const val = 'hotel';
  const cache = new Cache({
    dataDir,
    file: 'file-m.json',
    formatters: [{name: key, formatter: testFormatter}]
  });

  cache.set(key, val);
  t.deepEqual(cache.get(key), {[key]: val});
  cache.load(() => {
    t.true(log.error.calledOnce);
    t.deepEqual(cache.get(key), {
      [key]: ['foxtrot', 'golf', 'quebec', 'alpha']
    });
    t.end();
  });
});

test.cb('load(): should load the cache file', t => {
  const cache = new Cache({file: 'file-n.json'});
  const key = 'keyA';
  const val = 'romeo';

  cache.set(key, val);
  t.deepEqual(cache.get(key), {[key]: val});
  cache.load(() => {
    t.deepEqual(cache.get(key), {[key]: 'yankee'});
    t.end();
  });
});

test.after(() => {
  fs.readdir.restore();
  fs.readFile.restore();
  log.error.restore();
});

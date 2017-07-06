'use strict';

const fs = require('fs');
const path = require('path');
const chai = require('chai');
const sinon = require('sinon');
const Cache = require('../../lib/cache');
const log = require('../../lib/log');
const objectUtil = require('../../lib/util/object-util');

const should = chai.should();

/**
 * Returns an array of merged values
 * @param {Array}  arr
 * @param {Object} data
 * @returns {Array}
 */
function testFormatter(arr, data) {
  const acc = arr === null ? [] : arr;

  return acc.concat(objectUtil.flattenArray('keyA', data));
}

describe('Cache', () => {
  const dataDir = 'data-dir';
  const files = [];
  let cache;

  before(() => {
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
      .callsArgWithAsync(2, null, JSON.stringify({
        keyA: 'yankee'
      }));
  });

  beforeEach(() => {
    cache = new Cache();
  });

  describe('.get(key)', () => {
    it('should return null', () => {
      should.equal(cache.get('keyZ'), null);
    });

    it('should return an object containing the key-value pair', () => {
      const key = 'keyA';
      const val = ['sierra'];

      cache.set(key, val);
      cache.get(key).should.deep.equal({
        [key]: val
      });
    });
  });

  describe('.mset(keys, vals)', () => {
    it('should set the keys to the provided values', () => {
      const vals = {
        keyA: {keyD: 4},
        keyB: 'oscar',
        keyC: ['kilo']
      };
      const keys = Object.keys(vals);
      const length = keys.length;

      cache.mset(keys, vals);

      for (let i = 0; i < length; ++i) {
        cache.get(keys[i]).should.deep.equal({
          [keys[i]]: vals[keys[i]]
        });
      }
    });
  });

  describe('.set(key, val)', () => {
    it('should set the key to the provided value', () => {
      const key = 'keyA';
      const val = 'tango';

      cache.set(key, val);
      cache.get(key).should.deep.equal({
        [key]: val
      });
    });
  });

  describe('.load(callback)', () => {
    it('should load the files from the data directory', done => {
      const key = 'keyA';
      const val = 'romeo';

      cache = new Cache({
        dataDir,
        file: 'file-m.json',
        formatters: [{name: key, formatter: testFormatter}]
      });

      cache.set(key, val);
      cache.get(key).should.deep.equal({
        [key]: val
      });
      cache.load(() => {
        should.equal(log.error.calledOnce, true);
        cache.get(key).should.deep.equal({
          [key]: ['foxtrot', 'golf', 'quebec', 'alpha']
        });

        done();
      });
    });

    it('should load the cache file', done => {
      const key = 'keyA';
      const val = 'romeo';

      cache = new Cache({
        file: 'file-n.json'
      });

      cache.set(key, val);
      cache.get(key).should.deep.equal({
        [key]: val
      });
      cache.load(() => {
        cache.get(key).should.deep.equal({
          [key]: 'yankee'
        });

        done();
      });
    });
  });

  after(() => {
    fs.readdir.restore();
    fs.readFile.restore();
    log.error.restore();
  });
});

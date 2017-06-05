'use strict';

const chai = require('chai');
const fs = require('fs');
const path = require('path');
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

  return acc.concat(objectUtil.flattenArray('key_a', data));
}

describe('Cache', () => {
  const dataDir = 'data_dir';
  const files = [];
  let cache;

  before(() => {
    sinon.stub(fs, 'readFile');
    sinon.stub(fs, 'readdir');
    sinon.stub(log, 'error').callsFake(() => (true));

    let file = 'file_a.json';
    files.push(file);
    fs.readFile.withArgs(`${dataDir}${path.sep}${file}`, 'utf-8', sinon.match.func)
      .callsArgWithAsync(2, null, JSON.stringify({
        key_a: ['foxtrot', 'golf'],
        key_b: [{ key_d: 'oscar', key_a: ['quebec']}, { key_d: 'foxtrot', key_a: null }],
      }));

    file = 'file_b.json';
    files.push(file);
    fs.readFile.withArgs(`${dataDir}${path.sep}${file}`, 'utf-8', sinon.match.func)
      .callsArgWithAsync(2, null, 'november');

    file = 'file_c.json';
    files.push(file);
    fs.readFile.withArgs(`${dataDir}${path.sep}${file}`, 'utf-8', sinon.match.func)
      .callsArgWithAsync(2, null, JSON.stringify({
        key_a: ['alpha'],
        key_c: 'echo',
      }));

    fs.readdir.withArgs(dataDir, sinon.match.func).callsArgWithAsync(1, null, files);

    fs.readFile.withArgs('file_m.json', 'utf-8', sinon.match.func)
      .callsArgWithAsync(2, new Error('no such file or directory'));
    fs.readFile.withArgs('file_n.json', 'utf-8', sinon.match.func)
      .callsArgWithAsync(2, null, JSON.stringify({
        key_a: 'yankee',
      }));
  });

  beforeEach(() => {
    cache = new Cache();
  });

  describe('.get(key)', () => {
    it('should return null', () => {
      should.equal(cache.get('key_z'), null);
    });

    it('should return an object containing the key-value pair', () => {
      const key = 'key_a';
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
        key_a: { key_d: 4 },
        key_b: 'oscar',
        key_c: ['kilo'],
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
      const key = 'key_a';
      const val = 'tango';

      cache.set(key, val);
      cache.get(key).should.deep.equal({
        [key]: val
      });
    });
  });

  describe('.load(callback)', () => {
    it('should load the files from the data directory', done => {
      const key = 'key_a';
      const val = 'romeo';

      cache = new Cache({
        dataDir,
        file: 'file_m.json',
        formatters: [{ name: key, formatter: testFormatter }],
      });

      cache.set(key, val);
      cache.get(key).should.deep.equal({
        [key]: val,
      });
      cache.load(() => {
        should.equal(log.error.calledOnce, true);
        cache.get(key).should.deep.equal({
          [key]: ['foxtrot', 'golf', 'quebec', 'alpha'],
        });

        done();
      });
    });

    it('should load the cache file', done => {
      const key = 'key_a';
      const val = 'romeo';

      cache = new Cache({
        file: 'file_n.json',
      });

      cache.set(key, val);
      cache.get(key).should.deep.equal({
        [key]: val,
      });
      cache.load(() => {
        cache.get(key).should.deep.equal({
          [key]: 'yankee',
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

'use strict';

const chai = require('chai');
const objectUtil = require('../../../lib/util/object-util');

const should = chai.should();

describe('objectUtil', () => {
  describe('.flattenArray(key, obj)', () => {
    it('should return an empty array', () => {
      const result = objectUtil.flattenArray('key_z', {});

      result.should.be.an('array');
      result.should.be.empty;
    });

    it('should return an array of values associated with key', () => {
      const result = objectUtil.flattenArray('key_a', {
        key_a: ['alpha', 'bravo', 'zulu'],
        key_b: [{ key_c: 'lima', key_a: ['alpha', 'zulu', 'kilo']}, { key_d: 'hotel', key_a: null }],
      });

      result.should.be.an('array');
      result.should.include.members([
        'alpha',
        'bravo',
        'zulu',
        'alpha',
        'zulu',
        'kilo',
      ]);
    });
  });
});

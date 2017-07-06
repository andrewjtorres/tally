'use strict';

const objectUtil = require('../../../lib/util/object-util');

describe('objectUtil', () => {
  describe('.flattenArray(key, obj)', () => {
    it('should return an empty array', () => {
      const result = objectUtil.flattenArray('keyZ', {});

      result.should.be.an('array');
      result.should.be.empty;
    });

    it('should return an array of values associated with key', () => {
      const result = objectUtil.flattenArray('keyA', {
        keyA: ['alpha', 'bravo', 'zulu'],
        keyB: [{keyC: 'lima', keyA: ['alpha', 'zulu', 'kilo']}, {keyD: 'hotel', keyA: null}]
      });

      result.should.be.an('array');
      result.should.include.members([
        'alpha',
        'bravo',
        'zulu',
        'alpha',
        'zulu',
        'kilo'
      ]);
    });
  });
});

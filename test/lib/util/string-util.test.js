'use strict';

const chai = require('chai');
const stringUtil = require('../../../lib/util/string-util');

const should = chai.should();

describe('stringUtil', () => {
  describe('.mprepend(strs, data)', () => {
    it('should return an empty array', () => {
      const result = stringUtil.mprepend([], 'golf hotel ');

      result.should.be.an('array');
      result.should.be.empty;
    });

    it('should return an array of strings with data prepended to each', () => {
      stringUtil.mprepend([
        'alpha',
        'bravo',
        'foxtrot',
      ], 'golf hotel ').should.have.ordered.members([
        'golf hotel alpha',
        'golf hotel bravo',
        'golf hotel foxtrot',
      ]);
    });
  });

  describe('.prepend(str, data)', () => {
    it('should return a string with data prepended', () => {
      stringUtil.prepend('bravo', 'golf hotel ').should.equal('golf hotel bravo');
    });
  });
});

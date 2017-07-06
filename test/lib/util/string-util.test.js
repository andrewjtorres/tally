'use strict';

const stringUtil = require('../../../lib/util/string-util');

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
        'foxtrot'
      ], 'golf hotel ').should.have.ordered.members([
        'golf hotel alpha',
        'golf hotel bravo',
        'golf hotel foxtrot'
      ]);
    });
  });

  describe('.padEnd(str, length, pad)', () => {
    it('should return the provided string', () => {
      stringUtil.padEnd('mike', 2, '#').should.equal('mike');
    });

    it('should return a string with spaces applied to the end', () => {
      stringUtil.padEnd('yankee', 14).should.equal('yankee        ');
    });

    it('should return a string with the provided padding applied to the end', () => {
      stringUtil.padEnd('oscar', 10, '*').should.equal('oscar*****');
    });
  });

  describe('.padStart(str, length, pad)', () => {
    it('should return the provided string', () => {
      stringUtil.padStart('romeo', 3, '@').should.equal('romeo');
    });

    it('should return a string with spaces applied to the start', () => {
      stringUtil.padStart('whiskey', 9).should.equal('  whiskey');
    });

    it('should return a string with the provided padding applied to the start', () => {
      stringUtil.padStart('delta', 9, '!').should.equal('!!!!delta');
    });
  });

  describe('.prepend(str, data)', () => {
    it('should return a string with data prepended', () => {
      stringUtil.prepend('bravo', 'golf hotel ').should.equal('golf hotel bravo');
    });
  });
});

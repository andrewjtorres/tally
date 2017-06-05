'use strict';

const chai = require('chai');
const Tags = require('../../lib/tags');

const should = chai.should();

describe('Tags', () => {
  let tags;

  beforeEach(() => {
    tags = new Tags();
  });

  describe('.maxLength', () => {
    it('should return the max length of the keys', () => {
      tags.add('bravo', 2);
      tags.maxLength.should.equal(5);
    });
  });

  describe('.add(key, val = 0)', () => {
    it('should update the max length of the keys', () => {
      tags.add('tango', 4);
      tags.maxLength.should.equal(5);
      tags.add('foxtrot', 9);
      tags.maxLength.should.equal(7);
    });

    it('should add key-value pair', () => {
      const key = 'india';

      should.equal(tags.get(key), null);
      tags.add(key, 9);
      tags.get(key).should.equal(9);
    });

    it('should add value to the count associated to key', () => {
      const key = 'november';

      tags.add(key, 1);
      tags.get(key).should.equal(1);
      tags.add(key, 14);
      tags.get(key).should.equal(15);
    });
  });

  describe('.get(key)', () => {
    it('should return null', () => {
      should.equal(tags.get('juliet'), null);
    });

    it('should return the count associated to key', () => {
      const key = 'lima';
      const val = 8;

      tags.add(key, val);
      tags.get(key).should.equal(val);
    });
  });

  describe('.sort(order = true)', () => {
    it('should return an array of objects sorted in ascending order', () => {
      tags.add('oscar', 6);
      tags.add('romeo', 2);
      tags.add('victor', 6);

      tags.sort().should.have.deep.ordered.members([
        { name: 'romeo', count: 2 },
        { name: 'oscar', count: 6 },
        { name: 'victor', count: 6 },
      ]);
    });

    it('should return an array of objects sorted in descending order', () => {
      tags.add('whiskey', 8);
      tags.add('charlie', 1);
      tags.add('zulu', 5);

      tags.sort(false).should.have.deep.ordered.members([
        { name: 'whiskey', count: 8 },
        { name: 'zulu', count: 5 },
        { name: 'charlie', count: 1 },
      ]);
    });
  });

  describe('.toString(order = true)', () => {
    it('should return an array of objects sorted in ascending order represented as a string', () => {
      tags.add('golf', 12);
      tags.add('hotel', 9);

      tags.toString().should.equal('hotel  9\ngolf   12\n');
    });

    it('should return an array of objects sorted in descending order represented as a string', () => {
      tags.add('mike', 11);
      tags.add('xray', 5);

      tags.toString(false).should.equal('mike  11\nxray  5\n');
    });
  });
});

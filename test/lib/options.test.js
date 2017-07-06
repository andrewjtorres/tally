'use strict';

const fs = require('fs');
const chai = require('chai');
const sinon = require('sinon');
const Options = require('../../lib/options');

const should = chai.should();

describe('Options', () => {
  const file = 'file-a.txt';
  let options;

  before(() => {
    sinon.stub(fs, 'readFile');

    fs.readFile.withArgs(file, 'utf-8', sinon.match.func)
      .callsArgWithAsync(2, null, 'alpha\ntango\nfoxtrot\nzulu\noscar\n');
  });

  beforeEach(() => {
    options = new Options({file});
  });

  describe('.get(key)', () => {
    it('should return null', done => {
      options.parse([], () => {
        should.equal(options.get('keyA'), null);
        done();
      });
    });

    it('should return an object containing the key-value pair', done => {
      options.parse([], () => {
        const key = 'tags';

        options.get(key).should.deep.equal({
          [key]: ['alpha', 'tango', 'foxtrot', 'zulu', 'oscar']
        });
        done();
      });
    });
  });

  describe('.parse(args, callback)', () => {
    it('should parse the default tags file', done => {
      options.parse([], () => {
        const key = 'tags';

        options.get(key).should.deep.equal({
          [key]: ['alpha', 'tango', 'foxtrot', 'zulu', 'oscar']
        });
        done();
      });
    });

    it('should parse the last value in the arguments array', done => {
      options.parse(['', '', 'whiskey', 'charlie,india,bravo'], () => {
        const key = 'tags';

        options.get(key).should.deep.equal({
          [key]: ['charlie', 'india', 'bravo']
        });
        done();
      });
    });
  });

  after(() => {
    fs.readFile.restore();
  });
});

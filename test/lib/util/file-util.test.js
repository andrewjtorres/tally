'use strict';

const chai = require('chai');
const fs = require('fs');
const sinon = require('sinon');
const fileUtil = require('../../../lib/util/file-util');

const should = chai.should();

describe('fileUtil', () => {
  const files = [];

  before(() => {
    sinon.stub(fs, 'readFile');

    let file = 'file_a.ini';
    files.push(file);
    fs.readFile.withArgs(file, 'utf-8', sinon.match.func)
      .callsArgWithAsync(2, null, 'oscar = tango\n\n[*]\nlima = 4\nkilo = 10\n');

    file = 'file_b.txt';
    files.push(file);
    fs.readFile.withArgs(file, 'utf-8', sinon.match.func)
      .callsArgWithAsync(2, null, 'uniform');

    file = 'file_c.json';
    files.push(file);
    fs.readFile.withArgs(file, 'utf-8', sinon.match.func)
      .callsArgWithAsync(2, null, {
        key_a: 'papa',
        key_b: [1, 2],
      });
  });

  describe('.readFiles(files, opts, callback)', () => {
    it('should provide an empty array', done => {
      fileUtil.readFiles([], 'utf-8', data => {
        data.should.be.an('array');
        data.should.be.empty;
        done();
      });
    });

    it('should provide an array of objects containing error and data values', done => {
      fileUtil.readFiles(files, 'utf-8', data => {
        data.should.be.an('array');
        data.should.have.lengthOf(3);

        const length = files.length;

        for (let i = 0; i < length; ++i) {
          data[i].should.have.property('data');
          data[i].should.have.property('err');
        }

        done();
      });
    });
  });

  after(() => {
    fs.readFile.restore();
  });
});

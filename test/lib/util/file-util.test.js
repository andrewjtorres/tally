'use strict';

const fs = require('fs');
const sinon = require('sinon');
const test = require('ava');
const fileUtil = require('../../../lib/util/file-util');

const files = [];

test.before(() => {
  sinon.stub(fs, 'readFile');

  let file = 'file-a.ini';
  files.push(file);
  fs.readFile.withArgs(file, 'utf-8', sinon.match.func)
    .callsArgWithAsync(2, null, 'oscar = tango\n\n[*]\nlima = 4\nkilo = 10\n');

  file = 'file-b.txt';
  files.push(file);
  fs.readFile.withArgs(file, 'utf-8', sinon.match.func)
    .callsArgWithAsync(2, null, 'uniform');

  file = 'file-c.json';
  files.push(file);
  fs.readFile.withArgs(file, 'utf-8', sinon.match.func)
    .callsArgWithAsync(2, null, {
      keyA: 'papa',
      keyB: [1, 2]
    });
});

test.cb('readFiles(): should provide an empty array', t => {
  fileUtil.readFiles([], 'utf-8', data => {
    t.true(Array.isArray(data));
    t.is(data.length, 0);
    t.end();
  });
});

test.cb('readFiles(): should provide an array of objects containing error and data values', t => {
  fileUtil.readFiles(files, 'utf-8', data => {
    t.true(Array.isArray(data));
    t.is(data.length, 3);

    const length = files.length;

    for (let i = 0; i < length; ++i) {
      t.true('data' in data[i]);
      t.true('err' in data[i]);
    }

    t.end();
  });
});

test.after(() => {
  fs.readFile.restore();
});

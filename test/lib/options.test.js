'use strict';

const fs = require('fs');
const sinon = require('sinon');
const test = require('ava');
const Options = require('../../lib/options');

const file = 'file-a.txt';

test.before(() => {
  sinon.stub(fs, 'readFile');

  fs.readFile.withArgs(file, 'utf-8', sinon.match.func)
    .callsArgWithAsync(2, null, 'alpha\ntango\nfoxtrot\nzulu\noscar\n');
});

test.cb('get(): should return null', t => {
  const options = new Options({file});

  options.parse([], () => {
    t.is(options.get('keyA'), null);
    t.end();
  });
});

test.cb('get(): should return an object containing the key-value pair', t => {
  const options = new Options({file});

  options.parse([], () => {
    const key = 'tags';

    t.deepEqual(options.get(key), {
      [key]: ['alpha', 'tango', 'foxtrot', 'zulu', 'oscar']
    });
    t.end();
  });
});

test.cb('parse(): should parse the default tags file', t => {
  const options = new Options({file});

  options.parse([], () => {
    const key = 'tags';

    t.deepEqual(options.get(key), {
      [key]: ['alpha', 'tango', 'foxtrot', 'zulu', 'oscar']
    });
    t.end();
  });
});

test.cb('parse(): should parse the last value in the arguments array', t => {
  const options = new Options({file});

  options.parse(['', '', 'whiskey', 'charlie,india,bravo'], () => {
    const key = 'tags';

    t.deepEqual(options.get(key), {
      [key]: ['charlie', 'india', 'bravo']
    });
    t.end();
  });
});

test.after(() => {
  fs.readFile.restore();
});

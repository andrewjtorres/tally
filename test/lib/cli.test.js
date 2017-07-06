'use strict';

const sinon = require('sinon');
const test = require('ava');
const Cache = require('../../lib/cache');
const Options = require('../../lib/options');
const cli = require('../../lib/cli');
const log = require('../../lib/log');

test.before(() => {
  sinon.stub(Cache.prototype, 'get');
  sinon.stub(Cache.prototype, 'load');
  sinon.stub(Cache.prototype, 'write');
  sinon.stub(Options.prototype, 'get');
  sinon.stub(Options.prototype, 'parse');
  sinon.stub(log, 'info').callsFake(() => (true));

  Cache.prototype.get.withArgs('tags').returns({
    tags: {zulu: 2, tango: 3, lima: 1, alpha: 1, foxtrot: 2, yankee: 1, november: 2}
  });
  Cache.prototype.load.withArgs(sinon.match.func).callsArg(0);
  Cache.prototype.write.withArgs(sinon.match.func).callsArg(0);

  Options.prototype.get.withArgs('tags').returns({
    tags: ['tango', 'alpha', 'kilo', 'yankee', 'papa']
  });
  Options.prototype.parse.withArgs(sinon.match.array, sinon.match.func).callsArg(1);
});

test('execute(): should output a cross referenced list of tag name and count values in descending order', t => {
  cli.execute([]);

  t.true(log.info.calledOnce);
  t.deepEqual(log.info.args[0], ['tango   3\nalpha   1\nyankee  1\nkilo    0\npapa    0\n']);
});

test.after(() => {
  Cache.prototype.get.restore();
  Cache.prototype.load.restore();
  Cache.prototype.write.restore();
  Options.prototype.get.restore();
  Options.prototype.parse.restore();
  log.info.restore();
});

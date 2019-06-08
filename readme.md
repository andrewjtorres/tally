# Tag Counter

> A simple Node.js CLI application built using only core modules, plain
> callbacks, and asynchronous I/O functions

[![Travis CI](https://flat.badgen.net/travis/ajtorres9/tag-counter/master)](https://travis-ci.org/ajtorres9/tag-counter)
[![Coveralls](https://flat.badgen.net/coveralls/c/github/ajtorres9/tag-counter/master)](https://coveralls.io/github/ajtorres9/tag-counter?branch=master)
[![Code Style](https://flat.badgen.net/badge/code%20style/XO/5ed9c7)](https://github.com/sindresorhus/xo)
[![Commitizen](https://flat.badgen.net/badge/commitizen/friendly/green)](https://github.com/commitizen/cz-cli)
[![License](https://flat.badgen.net/github/license/ajtorres9/tag-counter)](license)

## Obeys the Following

- Allows the user to supply a CLI argument containing a comma-separated list of
  tags
  - If no argument is given, the `data/tags.txt` file is parsed to get an array
    of tags
- Each of the provided tags are cross referenced with the objects in
  `data/flat-files/*.json` to determine the amount of times they appear
- If any JSON parsing errors occur during the processing of the
  `data/flat-files/*.json` files, they are logged with `console.error()` and
  the processing continues
- The results of the JSON parsing are stored in a `data/cache.json` file to
  speed up subsequent executions
- The final output prints the tag name and associated count in ascending order:

```text
ipsum  3
dolor  2
amet   2
lorem  0
sit    0
```

## License

[MIT](license) &copy; [Andrew Torres](https://andrewjtorr.es)

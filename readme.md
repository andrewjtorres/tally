# Tag Counter
[![Coverage Status](https://coveralls.io/repos/github/ajtorres9/tag-counter/badge.svg?branch=master)](https://coveralls.io/github/ajtorres9/tag-counter?branch=master)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

A simple Node.js CLI application built using only core modules, plain callbacks, and
asynchronous I/O functions

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
[MIT](https://github.com/ajtorres9/tag-counter/blob/master/license)

# tag-counter-cli

> A simple Node.js CLI application built using only core modules, plain
> callbacks, and asynchronous I/O functions

[![GitHub Actions](https://flat.badgen.net/github/checks/ajtorres9/tag-counter-cli?label=build)](https://github.com/ajtorres9/tag-counter-cli/actions?workflow=CI)
[![LGTM](https://flat.badgen.net/lgtm/grade/g/ajtorres9/tag-counter-cli?label=code%20quality)](https://lgtm.com/projects/g/ajtorres9/tag-counter-cli)
[![Codecov](https://flat.badgen.net/codecov/c/github/ajtorres9/tag-counter-cli/master)](https://codecov.io/gh/ajtorres9/tag-counter-cli)
[![All Contributors](https://flat.badgen.net/badge/all%20contributors/1/orange)](#contributors)
[![Code Style](https://flat.badgen.net/badge/code%20style/prettier/ff69b4)](https://github.com/prettier/prettier)
[![Commitizen](https://flat.badgen.net/badge/commitizen/friendly/green)](https://github.com/commitizen/cz-cli)
[![License](https://flat.badgen.net/github/license/ajtorres9/tag-counter-cli)](license)

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

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://andrewjtorr.es"><img src="https://avatars2.githubusercontent.com/u/450495?v=4" width="100px;" alt="Andrew Torres"/><br /><sub><b>Andrew Torres</b></sub></a><br /><a href="https://github.com/ajtorres9/tag-counter-cli/commits?author=ajtorres9" title="Code">💻</a> <a href="https://github.com/ajtorres9/tag-counter-cli/commits?author=ajtorres9" title="Documentation">📖</a> <a href="#ideas-ajtorres9" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-ajtorres9" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/ajtorres9/tag-counter-cli/commits?author=ajtorres9" title="Tests">⚠️</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://allcontributors.org) specification. Contributions of any
kind are welcome!

## License

[MIT](license) &copy; [Andrew Torres](https://andrewjtorr.es)

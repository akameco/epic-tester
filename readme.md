# epic-tester

[![Build Status](https://travis-ci.org/akameco/epic-tester.svg?branch=master)](https://travis-ci.org/akameco/epic-tester)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

> simple Epic Marble Test

## Install

```
$ yarn add --dev epic-tester
```

## Usage

```js
const { epicTester } = require('epic-tester')

epicTester({
  title: 'Success API',
  epic,
  dependencies: {
    API: {
      getUser: () => Observable.of({ data: { name: 'キズナアイ' } }),
      getUsers: () =>
        Observable.of({
          data: [{ name: 'のじゃロリ' }, { name: 'キズナアイ' }],
        }),
    },
  },
  tests: [
    {
      title: 'FETCH_USER_SUCCESS',
      input$: '--a',
      expect$: '--b',
      values: {
        a: { type: 'FETCH_USER_REQUEST' },
        b: { type: 'FETCH_USER_SUCCESS', payload: { name: 'キズナアイ' } },
      },
    },
    {
      title: 'FETCH_USERS_SUCCESS',
      input$: '--a',
      expect$: '--b',
      values: {
        a: { type: 'FETCH_USERS_REQUEST' },
        b: {
          type: 'FETCH_USERS_SUCCESS',
          payload: [{ name: 'のじゃロリ' }, { name: 'キズナアイ' }],
        },
      },
    },
  ],
})
```

## API

### `epicTester({title, epic, state, dependencies, tests})`

#### title

Type: `string`
required: `true`<br>

test title.

#### epic

required: `true`<br>

#### state

#### dependencies

Type: `Object`<br>
Default: `{}`

#### tests

Type: `Array<{title, input$, expect$, values}>`<br>
required: `true`<br>
Default: `[]`

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/4002137?v=4" width="100px;"/><br /><sub>akameco</sub>](http://akameco.github.io)<br />[💻](https://github.com/akameco/epic-tester/commits?author=akameco "Code") [📖](https://github.com/akameco/epic-tester/commits?author=akameco "Documentation") [⚠️](https://github.com/akameco/epic-tester/commits?author=akameco "Tests") [🚇](#infra-akameco "Infrastructure (Hosting, Build-Tools, etc)") |
| :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## License

MIT © [akameco](http://akameco.github.io)

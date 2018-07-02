[![CircleCI](https://img.shields.io/circleci/project/github/intuit/Ignite.svg?style=for-the-badge)](https://circleci.com/gh/intuit/Ignite) [![Codecov](https://img.shields.io/codecov/c/github/intuit/ignite.svg?style=for-the-badge)](https://codecov.io/gh/intuit/ignite)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)
[![npm](https://img.shields.io/npm/v/ignite.svg?style=for-the-badge)](https://www.npmjs.com/package/ignite)
[![npm](https://img.shields.io/npm/dt/ignite.svg?style=for-the-badge)](https://www.npmjs.com/package/ignite) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge)](https://github.com/prettier/prettier) [![Intuit](https://img.shields.io/badge/Created%20by-Intuit-blue.svg?style=for-the-badge)](https://www.intuit.com/)

<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-11/256/fire.png">
  </a>
  <h1>
    <a href="https://intuit.github.io/Ignite/">
      Ignite
    </a>
  </h1>
  <p>Modern markdown documentation generation.</p>
</div>

<h2 align="center">Developing</h2>

To start developing Ignite, start up a terminal and run the following command. Be sure to restart the dev server when changing any non-React or non-markdown file, since webpack doesn't handle them.

```bash
yarn build:lib && yarn start
```

<h3 align="center">Debugging</h3>

To debug your build run

```bash
yarn build
```

Then use your favorite HTTP server to emulate a server environment.

```bash
python -m SimpleHTTPServer
```

:warning: All urls are relative to `options.baseURL.` Make sure to change baseURL if your website isn't served from '/'.

<h2 align="center">Publishing</h2>

Releasing and publishing are handled automatically. Any time a PR is merged or code is pushed to master a new version of Ignite is released along with publishing a new version of the documentation to GitHub Pages.

<h2 align="center">Contributing / Bug Reporting</h2>

<p align="center">
  <a href="https://github.com/intuit/Ignite/pulls">Pull Requests</a> welcome! Submit any bug report or feature enhancement as an
  <a href="https://github.com/intuit/Ignite/issues">issue</a>.
</p>

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/1192452?v=4" width="100px;"/><br /><sub><b>Andrew Lisowski</b></sub>](http://hipstersmoothie.com)<br />[💻](https://github.com/Intuit/Ignite/commits?author=hipstersmoothie "Code") [🎨](#design-hipstersmoothie "Design") [📖](https://github.com/Intuit/Ignite/commits?author=hipstersmoothie "Documentation") [💡](#example-hipstersmoothie "Examples") [🤔](#ideas-hipstersmoothie "Ideas, Planning, & Feedback") [🚇](#infra-hipstersmoothie "Infrastructure (Hosting, Build-Tools, etc)") [📦](#platform-hipstersmoothie "Packaging/porting to new platform") [👀](#review-hipstersmoothie "Reviewed Pull Requests") [⚠️](https://github.com/Intuit/Ignite/commits?author=hipstersmoothie "Tests") |
| :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

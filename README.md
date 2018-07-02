[![CircleCI](https://img.shields.io/circleci/project/github/intuit/Ignite.svg?style=for-the-badge)](https://circleci.com/gh/intuit/Ignite) [![Codecov](https://img.shields.io/codecov/c/github/intuit/ignite.svg?style=for-the-badge)](https://codecov.io/gh/intuit/ignite)

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

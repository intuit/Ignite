[![CircleCI](https://img.shields.io/circleci/project/github/intuit/Ignite/master.svg?style=for-the-badge)](https://circleci.com/gh/intuit/Ignite) [![Codecov](https://img.shields.io/codecov/c/github/intuit/ignite.svg?style=for-the-badge)](https://codecov.io/gh/intuit/ignite)
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=for-the-badge)](#contributors)
[![npm](https://img.shields.io/npm/v/ignite.svg?style=for-the-badge)](https://www.npmjs.com/package/ignite)
[![npm](https://img.shields.io/npm/dt/ignite.svg?style=for-the-badge)](https://www.npmjs.com/package/ignite) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge)](https://github.com/prettier/prettier) [![Intuit](https://img.shields.io/badge/Created%20by-Intuit-blue.svg?style=for-the-badge)](https://www.intuit.com/) [![Auto Release](https://img.shields.io/badge/release-auto.svg?colorA=888888&colorB=9B065A&label=auto&style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAACzElEQVR4AYXBW2iVBQAA4O+/nLlLO9NM7JSXasko2ASZMaKyhRKEDH2ohxHVWy6EiIiiLOgiZG9CtdgG0VNQoJEXRogVgZYylI1skiKVITPTTtnv3M7+v8UvnG3M+r7APLIRxStn69qzqeBBrMYyBDiL4SD0VeFmRwtrkrI5IjP0F7rjzrSjvbTqwubiLZffySrhRrSghBJa8EBYY0NyLJt8bDBOtzbEY72TldQ1kRm6otana8JK3/kzN/3V/NBPU6HsNnNlZAz/ukOalb0RBJKeQnykd7LiX5Fp/YXuQlfUuhXbg8Di5GL9jbXFq/tLa86PpxPhAPrwCYaiorS8L/uuPJh1hZFbcR8mewrx0d7JShr3F7pNW4vX0GRakKWVk7taDq7uPvFWw8YkMcPVb+vfvfRZ1i7zqFwjtmFouL72y6C/0L0Ie3GvaQXRyYVB3YZNE32/+A/D9bVLcRB3yw3hkRCdaDUtFl6Ykr20aaLvKoqIXUdbMj6GFzAmdxfWx9iIRrkDr1f27cFONGMUo/gRI/jNbIMYxJOoR1cY0OGaVPb5z9mlKbyJP/EsdmIXvsFmM7Ql42nEblX3xI1BbYbTkXCqRnxUbgzPo4T7sQBNeBG7zbAiDI8nWfZDhQWYCG4PFr+HMBQ6l5VPJybeRyJXwsdYJ/cRnlJV0yB4ZlUYtFQIkMZnst8fRrPcKezHCblz2IInMIkPzbbyb9mW42nWInc2xmE0y61AJ06oGsXL5rcOK1UdCbEXiVwNXsEy/6+EbaiVG8eeEAfxvaoSBnCH61uOD7BS1Ul8ESHBKWxCrdyd6EYNKihgEVrwOAbQruoytuBYIFfAc3gVN6iawhjKyNCEpYhVJXgbOzARyaU4hCtYizq5EI1YgiUoIlT1B7ZjByqmRWYbwtdYjoWoN7+LOIQefIqKawLzK6ID69GGpQgwhhEcwGGUzfEPAiPqsCXadFsAAAAASUVORK5CYII=)](https://github.com/intuit/auto-release)

<div align="center">
  <a href="https://intuit.github.io/Ignite/">
    <img width="250" height="250"
      src="./os-project-logo.svg">
  </a>
  <h1>
    <a href="https://intuit.github.io/Ignite/">
      Ignite
    </a>
  </h1>
  <p>Modern markdown documentation generation. </p>
</div>

<h2 align="center">Usage</h2>

Head over to the full [documentation](https://intuit.github.io/Ignite/) for a guide on getting started with Ignite.

<h2 align="center">Contributing</h2>

<h3 align="center">Developing</h2>

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

NOTE: All urls are relative to `options.baseURL.` Make sure to change baseURL if your website isn't served from '/'.

<h3 align="center">Publishing</h2>

Releasing and publishing are handled automatically. Any time a PR is merged or code is pushed to master a new version of Ignite is released along with publishing a new version of the documentation to GitHub Pages.

<p align="center">
  <a href="https://github.com/intuit/Ignite/pulls">Pull Requests</a> welcome! Submit any bug report or feature enhancement as an
  <a href="https://github.com/intuit/Ignite/issues">issue</a>.
</p>

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/1192452?v=4" width="100px;"/><br /><sub><b>Andrew Lisowski</b></sub>](http://hipstersmoothie.com)<br />[💻](https://github.com/Intuit/Ignite/commits?author=hipstersmoothie "Code") [🎨](#design-hipstersmoothie "Design") [📖](https://github.com/Intuit/Ignite/commits?author=hipstersmoothie "Documentation") [💡](#example-hipstersmoothie "Examples") [🤔](#ideas-hipstersmoothie "Ideas, Planning, & Feedback") [🚇](#infra-hipstersmoothie "Infrastructure (Hosting, Build-Tools, etc)") [📦](#platform-hipstersmoothie "Packaging/porting to new platform") [👀](#review-hipstersmoothie "Reviewed Pull Requests") [⚠️](https://github.com/Intuit/Ignite/commits?author=hipstersmoothie "Tests") | [<img src="https://avatars1.githubusercontent.com/u/13004162?v=4" width="100px;"/><br /><sub><b>Adam Dierkens</b></sub>](https://adamdierkens.com)<br />[💻](https://github.com/Intuit/Ignite/commits?author=adierkens "Code") [🤔](#ideas-adierkens "Ideas, Planning, & Feedback") |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## Awesome Plugins:

:star: [Prop-Types](https://github.com/hipstersmoothie/ignite-plugin-prop-types) - Takes a react component and displays a table with its prop-types.

:star: [JSON Schema](https://github.com/hipstersmoothie/ignite-plugin-json-schema) - Takes a JSON-Schema and exposes a Component that matches ids to auto-generate docs.

:rocket: If you want to add your plugins to this list make a PR! :rocket:

## Gallery

:nail_care: Have some beautiful docs built using Ignite? Make a PR and feature them here :nail_care:

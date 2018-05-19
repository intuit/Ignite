# Getting Started

## Installation

```bash
yarn add -D ignite
```

## Add scripts

Add `docs` script to package.json

```json
{
  "scripts": {
    "docs": "ignite",
    "docs:watch": "ignite -w"
  }
}
```

If your docs are set up according to the default configuration a folder `_ignite` will contain a bundled documentation website.

More information about configuration can be found at [Options](./Options.md)

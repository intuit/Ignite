# Publishing

Publishing to github pages is easy.

## Setup Branch

To publish your docs first setup a clean `gh-pages` branch.

```bash
$ git checkout --orphan master
# Creates a master branch, without any parents (it's an orphan!)
Switched to a new branch 'master'

$ git rm -rf .
# Remove all files from the old working tree
rm '.gitignore'
```

## Setup Key

To successfully publish you docs on a continuos integration service, or anything other than your local machine, you will need to set up a `GITHUB_KEY` environment variable.

```bash
GITHUB_KEY={github key with write access}
```

## Setup Script

Now all you need to do is setup up a `script` in package.json to publish the documentation.

```json
{
  "scripts": {
    "publish:docs": "ignite --publish"
  }
}
```

## Continuos Integration

### Circle CI

Make sure you have set up the `GITHUB_KEY` environment variable. Then add the publish job to your `config.yml`.

```yaml
publishDocs:
    <<: *defaults
    steps:
      - attach_workspace:
          at: ~/YourProject
      - run:
          name: Publish Docs
          command: yarn publish:docs
```

To publish the documentation on each commit to master, add this to your `config.yml`.

```yaml
- publishDocs:
    requires:
        - lint
        - test
    filters:
      branches:
        only:
          - master
```

# Publishing

Publishing to GitHub pages is easy.

[[toc]]

## Setup Branch

To publish your docs first set up a clean `gh-pages` branch.

```bash
git checkout --orphan gh-pages
git rm -rf . (the gitignored files/folders may still be there but nothing to worry)
git commit --allow-empty -m "empty commit"
git push -u origin gh-pages
```

## Setup Git

### Key

To successfully publish your documentation on a continuous integration environment, or anything other than your local machine, you will need to set up a `GH_TOKEN` environment variable.

```bash
GH_TOKEN={github key with write access}
```

### Name and Email

Ignite also needs a git name and email set to publish. To ensure this works locally and in the CI environment these values are pulled from the package.json author.

```json
{
  "author": {
    "name": "Your Name",
    "email": "your_github@email.com"
  }
}
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

Now all that's left to do is to publish to github-pages! Run the publish docs command and if everything goes well your 'gh-pages' branch should be updated with the new documentation bundle. A little more setup is needed for a continuous integration environment.

## Continuous Integration

### Circle CI

Make sure you have set up the `GH_TOKEN` environment variable. Then add the publish job to your `config.yml`.

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

# Publishing

Publishing to github pages is easy.

## Setup Branch

To publish your docs first setup a clean `gh-pages` branch.

```shell
$ git checkout --orphan master
# Creates a master branch, without any parents (it's an orphan!)
Switched to a new branch 'master'

$ git rm -rf .
# Remove all files from the old working tree
rm '.gitignore'
```

## Setup Key

To successfully publish you docs on a continuos integration service, or anything other than your local machine, you will need to set up a `GITHUB_KEY` environment variable.

```shell
GITHUB_KEY={github key with write access}
```

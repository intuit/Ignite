import MarkdownIt from 'markdown-it';
import collapse from '../collapse';

const md = new MarkdownIt().use(collapse);

test('collapse', () => {
  expect(
    md.render(`
::: collapse

# Title

## I can contain various combinations of elements.
:::
  `)
  ).toMatchSnapshot();

  expect(
    md.render(`
::: collapse open

# Title

## I can contain various combinations of elements.
:::
  `)
  ).toMatchSnapshot();

  expect(
    md.render(`
* ::: collapse [:package: Publishing](./pages/Publishing.html)
  * [Setup](./pages/Publishing.html#setup-branch)
  * [Continuous Integration](./pages/Publishing.html#Continuous-integration)
  `)
  ).toMatchSnapshot();
});

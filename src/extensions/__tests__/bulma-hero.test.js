import MarkdownIt from 'markdown-it';
import hero from '../bulma-hero';
import anchors from 'markdown-it-anchor';

const md = new MarkdownIt().use(hero);

test('bulma - hero', () => {
  expect(
    md.render(`
::: hero

# Title

## I can contain various combinations of elements.
:::
  `)
  ).toMatchSnapshot();

  md.use(anchors);

  expect(
    md.render(`
::: hero

# Title

## I can contain various combinations of elements.
:::
  `)
  ).toMatchSnapshot();
});

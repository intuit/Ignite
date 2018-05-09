import MarkdownIt from 'markdown-it';
import tile from '../bulma-tile';

const md = new MarkdownIt().use(tile);

test('bulma - tile', () => {
  expect(
    md.render(`
::: tile

# Title

## I can contain various combinations of elements.
:::
  `)
  ).toMatchSnapshot();

  expect(
    md.render(`
::: tile is-warning notification

# Title

## I can contain various combinations of elements.
:::
  `)
  ).toMatchSnapshot();
});

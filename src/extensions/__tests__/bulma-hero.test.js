import MarkdownIt from 'markdown-it';
import hero from '../bulma-hero';

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
});

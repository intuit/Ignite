import MarkdownIt from 'markdown-it';
import box from '../bulma-box';

const md = new MarkdownIt().use(box);

test('bulma - box', () => {
  expect(
    md.render(`
::: box

# Title

I can contain various combinations of elements.
:::
  `)
  ).toMatchSnapshot();
});

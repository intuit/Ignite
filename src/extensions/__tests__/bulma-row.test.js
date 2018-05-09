import MarkdownIt from 'markdown-it';
import row from '../bulma-row';

const md = new MarkdownIt().use(row);

test('bulma - row', () => {
  expect(
    md.render(`
||| row
# Title

## I can contain various combinations of elements.
|||
  `)
  ).toMatchSnapshot();
});

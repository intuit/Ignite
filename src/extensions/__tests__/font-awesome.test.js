import MarkdownIt from 'markdown-it';
import fontAwesome from '../font-awesome';

const md = new MarkdownIt().use(fontAwesome);

test('font-awesome - tag', () => {
  expect(md.render(':fas-bomb:')).toMatchSnapshot();
  expect(md.render(':far-bomb:')).toMatchSnapshot();
});

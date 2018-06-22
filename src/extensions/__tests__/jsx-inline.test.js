import MarkdownIt from 'markdown-it';
import jsx from 'markdown-it-jsx';
import inline from '../jsx-inline';

const md = new MarkdownIt().use(jsx).use(inline);

test('jsx - inline', () => {
  expect(md.render('<Foo />')).toMatchSnapshot();
});

import MarkdownIt from 'markdown-it';
import jsx from 'markdown-it-jsx';
import fence from '../jsx-fence';

// Fence rule must come before jsx rule
// Our fence rule removes the surrounding {' '} for code highlighting
const md = new MarkdownIt().use(fence).use(jsx);

test('jsx - fence', () => {
  expect(md.render('<Foo />')).toMatchSnapshot();
  expect(md.render('```# something in a code block```')).toMatchSnapshot();
});

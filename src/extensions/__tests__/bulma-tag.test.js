import MarkdownIt from 'markdown-it';
import tag from '../bulma-tag';

const md = new MarkdownIt().use(tag);

test('bulma - tag', () => {
  expect(md.render('#:is-info useful information')).toMatchSnapshot();
  expect(md.render('#:is-success:is-large extension')).toMatchSnapshot();
});

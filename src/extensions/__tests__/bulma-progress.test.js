import MarkdownIt from 'markdown-it';
import progress from '../bulma-progress';

const md = new MarkdownIt().use(progress);

test('bulma - progress', () => {
  expect(
    md.render("'%% 75 is-primary is-large Look at all this progress! %%")
  ).toMatchSnapshot();
});

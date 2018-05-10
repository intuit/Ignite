import MarkdownIt from 'markdown-it';
import message from '../bulma-message';

const md = new MarkdownIt().use(message);

test('bulma - message', () => {
  expect(
    md.render(`
::: message is-danger Message with a Title
Body of the message
:::
  `)
  ).toMatchSnapshot();
});

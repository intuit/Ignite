import MarkdownIt from 'markdown-it';
import button from '../bulma-button';

const md = new MarkdownIt().use(button);

test('bulma - button', () => {
  expect(
    md.render(`
::: button is-large is-link is-bold is-inverted is-outlined
[Get Started :tada:](pages/GettingStarted.md)
:::
  `)
  ).toMatchSnapshot();
});

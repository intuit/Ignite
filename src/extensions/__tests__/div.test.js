import MarkdownIt from 'markdown-it';
import attrs from 'markdown-it-attrs';
import div from '../div';

const md = new MarkdownIt().use(div).use(attrs);

test('div', () => {
  expect(
    md.render(`
::: div with some classes
content
:::
  `)
  ).toMatchSnapshot();

  expect(
    md.render(`
::: div {.class .names}
content
:::
  `)
  ).toMatchSnapshot();
});

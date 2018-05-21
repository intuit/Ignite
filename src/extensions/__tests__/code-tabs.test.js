import MarkdownIt from 'markdown-it';
import tabs from '../code-tabs';

const md = new MarkdownIt().use(tabs);

test('code tabs', () => {
  expect(
    md.render(`
::: codeTabs CSS HTML JS

\`\`\`css [0]
.className {
  background: red;
}
\`\`\`

\`\`\`html [1]
<div class="className">
\`\`\`

\`\`\`javascript [2]
function doSomething() {
  return 'foo';
}
\`\`\`

:::
  `)
  ).toMatchSnapshot();
});

test('code tabs - does nothing to non matching blocks', () => {
  expect(
    md.render(`
\`\`\`javascript
function doSomething() {
  return 'foo';
}
\`\`\`
  `)
  ).toMatchSnapshot();
});

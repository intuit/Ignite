import { renderMarkdown } from '../markdown-it';

test('renderMarkdown', () => {
  expect(renderMarkdown('# Title')).toBe('<h1>Title</h1>\n');
});

test('renderMarkdown - plugins', () => {
  expect(
    renderMarkdown('# Title', {
      plugins: ['markdown-it-anchor']
    })
  ).toBe('<h1 id="title">Title</h1>\n');
});

test('renderMarkdown - plugins', () => {
  expect(
    renderMarkdown('# Title', {
      plugins: [
        [
          'markdown-it-anchor',
          {
            permalink: true
          }
        ]
      ]
    })
  ).toBe(
    '<h1 id="title">Title <a class="header-anchor" href="#title" aria-hidden="true">¶</a></h1>\n'
  );
});

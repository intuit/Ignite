import haskLink from '../../src/loaders/hash-link';

test('haskLink', () => {
  expect(
    haskLink(`
    [Markdown link 1](./markdown.md)
    [Markdown link 2](./markdown2.md)
  `)
  ).toBe(`
    [Markdown link 1](#/markdown.md)
    [Markdown link 2](#/markdown2.md)
  `);

  expect(
    haskLink.bind({ resourcePath: '/path/' })(`
    [Image 1](./link/to/image.png)
    [Image 2](./link/to/another.png "With a description")
  `)
  ).toBe(`
    [Image 1](../../../../link/to/image.png )
    [Image 2](../../../../link/to/another.png "With a description")
  `);
});

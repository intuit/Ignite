import haskLink from '../hash-link';

describe('haskLink', () => {
  test('should leave http links alone', () => {
    expect(
      haskLink(`
      [Markdown link 1](https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350)
      [Markdown link 2](https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&h=350)
    `)
    ).toBe(`
      [Markdown link 1](https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350)
      [Markdown link 2](https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&h=350)
    `);
  });

  test('should hasg link', () => {
    expect(
      haskLink(`
      [Markdown link 1](./markdown.md)
      [Markdown link 2](./markdown2.md)
    `)
    ).toBe(`
      [Markdown link 1](#/markdown.md)
      [Markdown link 2](#/markdown2.md)
    `);
  });

  test('should make relative paths to images', () => {
    expect(
      haskLink.bind({ resourcePath: '/path/' })(
        `
      [Image 1](./link/to/image.png)
      [Image 2](./link/to/another.png "With a description")
    `,
        '/some/path'
      )
    ).toBe(`
      [Image 1](../../link/to/image.png )
      [Image 2](../../link/to/another.png "With a description")
    `);
  });
});

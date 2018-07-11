import { transformLink, transform } from '../hash-link';

describe('transformLink', () => {
  beforeAll(() => {
    jest.spyOn(process, 'cwd').mockReturnValue('/project');
  });

  afterAll(() => {
    process.cwd.mockRestore();
  });

  test('should leave id links alone', () => {
    expect(transformLink('/path/', '#link')).toBe('#link');
  });

  test('should leave http links alone', () => {
    expect(
      transformLink(
        '/path/',
        'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350'
      )
    ).toBe(
      'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350'
    );
  });

  test('should hash link', () => {
    expect(
      transformLink('/docs/example.md', './markdown.md', {
        src: 'docs/',
        baseURL: '/'
      })
    ).toBe('/docs/markdown.html');
  });

  test('should make relative paths to images', () => {
    expect(
      transformLink('/path/', './link/to/image.png', {
        src: 'docs/',
        baseURL: '/'
      })
    ).toBe('./link/to/image.png');
    expect(
      transformLink('/path/', './link/to/image.png "With a description"', {
        src: 'docs/'
      })
    ).toBe('./link/to/image.png "With a description"');
  });
});

describe('transform', () => {
  const options = {
    src: './docs/',
    baseURL: '/'
  };

  expect(
    transform(
      `
    [Link](#foo)
    [Another](pages/intro.md)
  `,
      'docs/path',
      options
    )
  ).toMatchSnapshot();
});

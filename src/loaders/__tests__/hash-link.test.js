import { transformLink } from '../hash-link';

describe('transformLink', () => {
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

  test('should hasg link', () => {
    expect(
      transformLink('/docs/example.md', './markdown.md', { src: 'docs/' })
    ).toBe('../../../../docs/markdown.md');
  });

  test('should make relative paths to images', () => {
    expect(
      transformLink('/path/', './link/to/image.png', { src: 'docs/' })
    ).toBe('../../../../link/to/image.png ');
    expect(
      transformLink('/path/', './link/to/image.png "With a description"', {
        src: 'docs/'
      })
    ).toBe('../../../../link/to/image.png "With a description"');
  });
});

import generate, { stringify } from '../generate';

test('stringify', () => {
  expect(
    stringify({
      number: 1,
      string: 'string',
      bool: true,
      array: [() => 'string'],
      functions: {
        first: () => {
          return 1;
        }
      }
    })
  ).toMatchSnapshot();
});

describe('generate', () => {
  const options = {
    src: 'docs/',
    baseURL: '/',
    index: 'index.md',
    dir: '/folder'
  };

  const entries = ['path/to/markdown.md', 'path/to/another-markdown.md'];

  const plugins = [
    ['first', 'path/to/plugin.js'],
    [
      'second',
      'path/to/another-plugin.js',
      {
        options: 1337
      }
    ],
    ['npm', 'npm-package'],
    ['{ es6 }', 'modules'],
    ['Default, { AnExport, AnotherExport }', 'another-package']
  ];

  test('should add markdown', () => {
    expect(generate(entries, undefined, options)()).toMatchSnapshot();
  });

  test('should add plugins', () => {
    expect(generate(undefined, plugins, options)()).toMatchSnapshot();
  });

  test('should add blogPosts', () => {
    expect(
      generate(['/docs/blog/Post/1.md', '/docs/blog/Post/1.md'], plugins, {
        ...options,
        blogPosts: [
          {
            path: '/docs/blog/Post/1.md',
            birth: 1
          },
          {
            path: '/docs/blog/Post/1.md',
            birth: 2
          }
        ]
      })()
    ).toMatchSnapshot();
  });
});

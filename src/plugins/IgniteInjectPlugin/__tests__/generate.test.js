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
    ['npm', 'npm-package']
  ];

  test('should add markdown', () => {
    expect(generate(entries, undefined, options)()).toMatchSnapshot();
  });

  test('should add plugins', () => {
    expect(generate(undefined, plugins, options)()).toMatchSnapshot();
  });
});

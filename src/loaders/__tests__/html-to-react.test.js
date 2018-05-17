import {
  getLink,
  addActive,
  addActiveAll,
  index,
  replaceAt,
  insertBreaks,
  regexIndexOf,
  replaceIdLinks,
  sanitizeJSX,
  markDownPage,
  detectIndex
} from '../html-to-react';

test('getLink', () => {
  expect(getLink('<a href="/foo">Foo</a>')).toBe('foo');
  expect(getLink('<a>Foo</a>')).toBe('');
});

test('replaceAt', () => {
  expect(replaceAt('A dog barked loudly', 'dog', 'wolf', 2)).toBe(
    'A wolf barked loudly'
  );
});

test('addActive', () => {
  expect(
    addActive('<a href="/foo">Foo</a>', 'foo', 'bar', 'index.md')
  ).toMatchSnapshot();
});

test('addActiveAll', () => {
  expect(
    addActiveAll(
      `
      <a href="/foo">Foo</a>'
      <a href="/bar">Foo</a>'
    `,
      'bar',
      'index.md'
    )
  ).toMatchSnapshot();
});

test('index', () => {
  expect(index('<ul></ul>', '/path', {})).toMatchSnapshot();
  expect(index('<p></p>', '/path', {})).toMatchSnapshot();
});

test('insertBreaks', () => {
  expect(
    insertBreaks(`
    <div>
      <pre>
        Line
        with
        breaks
      </pre>

      <pre>
        Another
        Line
        with
        breaks
      </pre>
    </div>
  `)
  ).toMatchSnapshot();
});

test('regexIndexOf', () => {
  expect(regexIndexOf('I am the test:string.', /[\S]+:[\S]+/)).toBe(9);
  expect(regexIndexOf('I am the test:string.', /[\S]+:[\S]+/, 15)).toBe(-1);
});

test('replaceIdLinks', () => {
  expect(
    replaceIdLinks(`
    <a href="#some-id">Link</a>
    <a className="fas fa-hashtag headerLink" href="#some-other-id">Link</a>
  `)
  ).toMatchSnapshot();
});

test('sanitizeJSX', () => {
  expect(
    sanitizeJSX('<a className="/foo">{Foo}</a>', '/path', {})
  ).toMatchSnapshot();
  expect(
    sanitizeJSX('<a className=!{"/foo"!}>Foo</a>', '/path', {})
  ).toMatchSnapshot();

  expect(sanitizeJSX('<br>', '/path', {})).toMatchSnapshot();
  expect(sanitizeJSX('<pluginprovider>', '/path', {})).toMatchSnapshot();
  expect(
    sanitizeJSX('<div class="checkbox" />', '/path', {})
  ).toMatchSnapshot();
  expect(
    sanitizeJSX('<label for="checkbox" />', '/path', {})
  ).toMatchSnapshot();
  expect(
    sanitizeJSX('<input type="checkbox" />', '/path', {})
  ).toMatchSnapshot();
  expect(
    sanitizeJSX(
      `
      <pre>
        content
      </pre>
    `,
      '/path',
      {}
    )
  ).toMatchSnapshot();
});

test('markDownPage', () => {
  expect(
    markDownPage(`<span class="highlighted-line"></span>`)
  ).toMatchSnapshot();
});

test('detectIndex', () => {
  const options = {
    index: 'index.md'
  };

  expect(detectIndex('path/to/file.md', 'file.md', options)).toBe(false);
  expect(detectIndex('path/to/index.md', 'index.md', options)).toBe(true);

  options.navItems = {
    root: '/',
    pages: 'pages'
  };

  expect(detectIndex('path/to/index.md', 'index.md', options)).toBe(true);
  expect(detectIndex('path/to/pages/index.md', 'pages/index.md', options)).toBe(
    true
  );
});

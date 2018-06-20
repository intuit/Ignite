import {
  getLink,
  addActive,
  addActiveAll,
  codeTabs,
  loadImages,
  initPage,
  homePage,
  blogPost,
  index,
  insertBreaks,
  regexIndexOf,
  replaceIdLinks,
  sanitizeJSX,
  markDownPage,
  detectIndex,
  determinePage
} from '../html-to-react';

test('getLink', () => {
  expect(getLink('<a href="/foo">Foo</a>').link).toBe('foo');
  expect(getLink('<a>Foo</a>').link).toBe('');
});

test('addActive', () => {
  expect(
    addActive('<a href="/foo">Foo</a>', 'foo', { link: 'bar' }, 'index.md', {
      baseURL: '/'
    })
  ).toMatchSnapshot();
});

test('addActiveAll', () => {
  expect(
    addActiveAll(
      `
      <a href=""></a>'
      <a href="/foo">Foo</a>'
      <a href="/bar">Foo</a>'
    `,
      { link: 'bar' },
      'index.md',
      { baseURL: '/' }
    )
  ).toMatchSnapshot();
});

test('codeTabs - generates a unique class for each', () => {
  expect(
    codeTabs(`
      <CodeTabs>
        <pre>
          <code>
            function foo () {
              return 'foo';
            }
          </code>
        </pre>
      </CodeTabs>

      <CodeTabs>
        <pre>
          <code>
            function bar () {
              return 'bar';
            }
          </code>
        </pre>
      </CodeTabs>

      <div/>
    `)
  ).toMatchSnapshot();
});

test('loadImages', async () => {
  const result = await Promise.all(
    loadImages(`
    <img src="/path/to/image.png" />
    <div/>
    <img src="/path/another/image.png" />
    <div/>
    <img src="http://pngimg.com/uploads/cat/cat_PNG50528.png" />
    <img src="//pngimg.com/uploads/cat/cat_PNG50528.png" />
  `)
  );

  expect(result).toMatchSnapshot();
});

test('initPage', async () => {
  const result = await initPage(
    `
    <div> some source </div>
  `,
    '/path/to/markdown.md',
    { baseURL: '/' }
  );
  expect(result).toMatchSnapshot();
});

test('index', () => {
  expect(index('<ul></ul>', '/path', { baseURL: '/' })).toMatchSnapshot();
  expect(index('<p></p>', '/path', { baseURL: '/' })).toMatchSnapshot();
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

test('sanitizeJSX- complex', () => {
  expect(
    sanitizeJSX(`
    <a class="fas fa-hashtag headerLink" href="#zero-hassle-documentation" aria-hidden="true" />
    <a href="#/pages/GettingStarted.md">&#x1F389; Get Started</a>
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

test('blogPost', () => {
  expect(
    blogPost(
      `<span class="highlighted-line"></span>`,
      '/path/to/markdown.png',
      {
        blogPosts: []
      }
    )
  ).toMatchSnapshot();
});

test('homePage put everything in a hero', () => {
  expect(
    homePage(`
      <div class='hero'>
        Some hero content
      </div>
      <div>other</div>
      <div>not hero</div>
      <div class='hero'>
        Another hero
      </div>
    `)
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

describe('determinePage', () => {
  test('home', async () => {
    const result = await determinePage(`<div />`, 'home.md', {
      src: '/docs'
    });
    expect(result).toMatch(/homePage/);
  });

  test('blogPost', async () => {
    const result = await determinePage(`<div />`, '/docs/blog/post.md', {
      src: '/docs'
    });
    expect(result).toMatch(/blogPost/);
  });

  test('index', async () => {
    const result = await determinePage(`<div />`, 'index.md', {
      src: '/docs',
      baseURL: '/',
      index: 'index.md'
    });
    expect(result).toMatch(/function index/);
  });

  test('defaults to markdown page', async () => {
    const result = await determinePage(`<div />`, 'somePage.md', {
      src: '/docs',
      baseURL: '/',
      index: 'index.md'
    });
    expect(result).toMatch(/markDownPage/);
  });
});

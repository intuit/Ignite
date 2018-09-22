import React from 'react';

import App from '../App';
import renderToJson from './utils/render-to-json';

describe('App', () => {
  const markdown = {
    indexFiles: {},
    '/index': () => <h1>Index</h1>
  };

  beforeEach(() => {
    process.env.baseURL = '/';
    window.configuration = {};
  });

  test('renders matched page', () => {
    const foo = () => <h1>Foo man chu!</h1>;
    markdown['/foo'] = foo;

    expect(
      renderToJson(
        <App
          markdown={markdown}
          index="index"
          location={{ pathname: '/foo' }}
        />
      )
    ).toMatchSnapshot();
  });

  test('renders first page at index if found', () => {
    const firstPage = () => <h1>I am the Intro</h1>;
    markdown['/firstPage'] = firstPage;
    markdown['/firstPagePath'] = '/firstPage';

    expect(
      renderToJson(
        <App
          markdown={markdown}
          index="index"
          location={{ pathname: '/', hash: '#foo' }}
        />
      )
    ).toMatchSnapshot();
  });

  test('renders home page', () => {
    const home = () => <h1>I am Home</h1>;
    markdown['/home'] = home;

    expect(
      renderToJson(
        <App
          markdown={markdown}
          index="index"
          location={{ pathname: '/home' }}
        />
      )
    ).toMatchSnapshot();
  });

  test('renders blog page', () => {
    markdown['/blog/index.md'] = () => <h1>Blog Index</h1>;
    markdown['/blog/page.md'] = () => <h1>Blog Page</h1>;

    expect(
      renderToJson(
        <App
          markdown={markdown}
          index="/index"
          location={{ pathname: '/blog/page.md', hash: '', search: '' }}
        />
      )
    ).toMatchSnapshot();
  });
});

import React from 'react';

import App, { determineComponents } from '../App';
import renderToJson from './utils/render-to-json';

describe('determineComponents', () => {
  let markdown;

  beforeEach(() => {
    process.env.baseURL = '/';
    markdown = {
      '/index.md': () => <ul>List of Links</ul>,
      '/firstPage.md': () => <h1> First Page </h1>,
      indexFiles: {
        '/index.md': '/firstPage.md'
      }
    };
  });

  test('renders nothing if no pages found', () => {
    const { SidebarComponent, Page } = determineComponents(
      {},
      { pathname: 'notFound' },
      'index.md'
    );
    expect(SidebarComponent).toBeUndefined();
    expect(() => renderToJson(<Page />)).not.toThrow();
  });

  test('renders first page if it exists and no pages found', () => {
    const { SidebarComponent, Page } = determineComponents(
      markdown,
      { pathname: '/notFound' },
      '/index.md'
    );

    expect(renderToJson(<SidebarComponent />)).toMatchSnapshot();
    expect(renderToJson(<Page />)).toMatchSnapshot();
  });

  test('renders matching index file if filePath matches index filename pattern', () => {
    const { SidebarComponent, Page } = determineComponents(
      markdown,
      { pathname: '/index.md' },
      '/index.md'
    );

    expect(renderToJson(<SidebarComponent />)).toMatchSnapshot();
    expect(renderToJson(<Page />)).toMatchSnapshot();
  });

  test('render matching page if found', () => {
    const navItems = {
      root: '/',
      'Name of Item': '/',
      'Name of Another Item': 'folder'
    };
    markdown['/file.md'] = () => <p> foo </p>;

    const { SidebarComponent, Page } = determineComponents(
      markdown,
      { pathname: '/file.md' },
      '/index.md',
      navItems
    );

    expect(renderToJson(<SidebarComponent />)).toMatchSnapshot();
    expect(renderToJson(<Page />)).toMatchSnapshot();
  });

  test('render matching index file in subpath', () => {
    const navItems = {
      root: '/',
      'Name of Item': '/',
      'Name of Another Item': '/folder'
    };
    markdown['/folder/index.md'] = () => <ul> Folder Links </ul>;
    markdown.indexFiles['/folder/index.md'] = '/folder/first.md';
    markdown['/folder/file.md'] = () => <p> foo </p>;

    const { SidebarComponent, Page } = determineComponents(
      markdown,
      { pathname: '/folder/file.md' },
      '/index.md',
      navItems
    );

    expect(renderToJson(<SidebarComponent />)).toMatchSnapshot();
    expect(renderToJson(<Page />)).toMatchSnapshot();
  });

  test('render matching index file and first page if path not found', () => {
    const navItems = {
      root: '/',
      'Name of Item': '/',
      'Name of Another Item': '/folder'
    };
    markdown['/folder/index.md'] = () => <ul> Folder Links </ul>;
    markdown.indexFiles['/folder/index.md'] = '/folder/first.md';
    markdown['/folder/first.md'] = () => <p> Folder First </p>;

    const { SidebarComponent, Page } = determineComponents(
      markdown,
      { pathname: '/folder/file.md' },
      '/index.md',
      navItems
    );

    expect(renderToJson(<SidebarComponent />)).toMatchSnapshot();
    expect(renderToJson(<Page />)).toMatchSnapshot();
  });

  test('renders root index if no matching subPath first page found', () => {
    const navItems = {
      root: '/',
      'Name of Item': '/',
      'Name of Another Item': '/folder'
    };
    markdown.indexFiles['/folder/index.md'] = '/folder/first.md';

    const { SidebarComponent, Page } = determineComponents(
      markdown,
      { pathname: '/folder/file.md' },
      '/index.md',
      navItems
    );

    expect(renderToJson(<SidebarComponent />)).toMatchSnapshot();
    expect(renderToJson(<Page />)).toMatchSnapshot();
  });

  test('render matching subpath index file and first page if path not found', () => {
    const navItems = {
      root: '/pages',
      'Name of Item': '/pages',
      'Name of Another Item': '/folder'
    };
    markdown['/pages/index.md'] = () => <ul> Pages Links </ul>;
    markdown.indexFiles['/pages/index.md'] = 'firstPage.md';
    markdown['/folder/index.md'] = () => <ul> Folder Links </ul>;
    markdown.indexFiles['/folder/index.md'] = '/folder/first.md';

    const { SidebarComponent, Page } = determineComponents(
      markdown,
      { pathname: '/folder/file.md' },
      '/index.md',
      navItems
    );

    expect(renderToJson(<SidebarComponent />)).toMatchSnapshot();
    expect(renderToJson(<Page />)).toMatchSnapshot();
  });
});

describe('App', () => {
  const markdown = {
    '/index': () => <h1>Index</h1>
  };

  beforeEach(() => {
    process.env.baseURL = '/';
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
    markdown['/home.md'] = home;

    expect(
      renderToJson(
        <App markdown={markdown} index="index" location={{ pathname: '/' }} />
      )
    ).toMatchSnapshot();
  });

  test('renders blog index', () => {
    markdown['/blog/index.md'] = () => <h1>Blog Index</h1>;
    markdown['/blog/page.md'] = () => <h1>Blog Page</h1>;

    expect(
      renderToJson(
        <App
          markdown={markdown}
          index="/index"
          location={{ pathname: '/blog/index.md', hash: '', search: '' }}
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

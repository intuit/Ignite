import React from 'react';

import { determinePage, determineSidebar } from '../App/determine-components';
import renderToJson from './utils/render-to-json';

describe('determineComponents', () => {
  let markdown;

  beforeEach(() => {
    process.env.baseURL = '/';
    window.configuration = {};
    markdown = {
      '/index': () => <ul>List of Links</ul>,
      '/firstPage': () => <h1> First Page </h1>,
      indexFiles: {
        '/index': '/firstPage'
      }
    };
  });

  test('renders nothing if no pages found', () => {
    const args = [{ indexFiles: {} }, { pathname: 'notFound' }, 'index'];
    const Page = determinePage(...args);
    const SidebarComponent = determineSidebar(...args);

    expect(SidebarComponent).toBeUndefined();
    expect(() => renderToJson(<Page />)).not.toThrow();
  });

  test('renders first page if it exists and no pages found', () => {
    const args = [markdown, { pathname: '/notFound' }, '/index'];
    const Page = determinePage(...args);
    const SidebarComponent = determineSidebar(...args);

    expect(renderToJson(<SidebarComponent />)).toMatchSnapshot();
    expect(renderToJson(<Page />)).toMatchSnapshot();
  });

  test('renders matching index file if filePath matches index filename pattern', () => {
    const args = [markdown, { pathname: '/index' }, '/index'];
    const Page = determinePage(...args);
    const SidebarComponent = determineSidebar(...args);

    expect(renderToJson(<SidebarComponent />)).toMatchSnapshot();
    expect(renderToJson(<Page />)).toMatchSnapshot();
  });

  test('render matching page if found', () => {
    const navItems = {
      root: '/',
      'Name of Item': '/',
      'Name of Another Item': 'folder'
    };
    markdown['/file'] = () => <p> foo </p>;

    const args = [markdown, { pathname: '/file' }, '/index', navItems];
    const Page = determinePage(...args);
    const SidebarComponent = determineSidebar(...args);

    expect(renderToJson(<SidebarComponent />)).toMatchSnapshot();
    expect(renderToJson(<Page />)).toMatchSnapshot();
  });

  test('render matching index file in subpath', () => {
    const navItems = {
      root: '/',
      'Name of Item': '/',
      'Name of Another Item': '/folder'
    };
    markdown['/folder/index'] = () => <ul> Folder Links </ul>;
    markdown.indexFiles['/folder/index'] = '/folder/first';
    markdown['/folder/file'] = () => <p> foo </p>;

    const args = [markdown, { pathname: '/folder/file' }, '/index', navItems];
    const Page = determinePage(...args);
    const SidebarComponent = determineSidebar(...args);

    expect(renderToJson(<SidebarComponent />)).toMatchSnapshot();
    expect(renderToJson(<Page />)).toMatchSnapshot();
  });

  test('render matching index file and first page if path not found', () => {
    const navItems = {
      root: '/',
      'Name of Item': '/',
      'Name of Another Item': '/folder'
    };
    markdown['/folder/index'] = () => <ul> Folder Links </ul>;
    markdown.indexFiles['/folder/index'] = '/folder/first';
    markdown['/folder/first'] = () => <p> Folder First </p>;

    const args = [markdown, { pathname: '/folder/file' }, '/index', navItems];
    const Page = determinePage(...args);
    const SidebarComponent = determineSidebar(...args);

    expect(renderToJson(<SidebarComponent />)).toMatchSnapshot();
    expect(renderToJson(<Page />)).toMatchSnapshot();
  });

  test('renders root index if no matching subPath first page found', () => {
    const navItems = {
      root: '/',
      'Name of Item': '/',
      'Name of Another Item': '/folder'
    };
    markdown.indexFiles['/folder/index'] = '/folder/first';

    const args = [markdown, { pathname: '/folder/file' }, '/index', navItems];
    const Page = determinePage(...args);
    const SidebarComponent = determineSidebar(...args);

    expect(renderToJson(<SidebarComponent />)).toMatchSnapshot();
    expect(renderToJson(<Page />)).toMatchSnapshot();
  });

  test('render matching subpath index file and first page if path not found', () => {
    const navItems = {
      root: '/pages',
      'Name of Item': '/pages',
      'Name of Another Item': '/folder'
    };
    markdown['/pages/index'] = () => <ul> Pages Links </ul>;
    markdown.indexFiles['/pages/index'] = 'firstPage';
    markdown['/folder/index'] = () => <ul> Folder Links </ul>;
    markdown.indexFiles['/folder/index'] = '/folder/first';

    const args = [markdown, { pathname: '/folder/file' }, '/index', navItems];
    const Page = determinePage(...args);
    const SidebarComponent = determineSidebar(...args);

    expect(renderToJson(<SidebarComponent />)).toMatchSnapshot();
    expect(renderToJson(<Page />)).toMatchSnapshot();
  });
});

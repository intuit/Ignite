import React from 'react';

import MarkdownProvider from '../MarkdownProvider';
import renderToJson from './utils/render-to-json';

test('Has default route', () => {
  expect(renderToJson(<MarkdownProvider />)).toMatchSnapshot();
});

const markdown = [];

test('update markdown provided', () => {
  markdown.push(['/foo/bar', () => <h1> Simple Component </h1>]);
  expect(
    renderToJson(<MarkdownProvider markdown={markdown} />, { new: true })
  ).toMatchSnapshot();
});

test('sets first page and root from index file', () => {
  markdown.push([
    '/foo/bar',
    () => <h1> Simple Component </h1>,
    true,
    '/first/page'
  ]);
  expect(
    renderToJson(<MarkdownProvider markdown={markdown} />, { new: true })
  ).toMatchSnapshot();
});

const plugins = [];

test('uses plugins', () => {
  plugins.push(['test', () => <h1> Simple Component </h1>]);
  expect(
    renderToJson(<MarkdownProvider markdown={markdown} plugins={plugins} />, {
      new: true
    })
  ).toMatchSnapshot();
});

import React from 'react';

import MarkdownProvider, { update } from '../MarkdownProvider';
import renderToJson from './util';

test('Has default route', () => {
  expect(renderToJson(<MarkdownProvider />)).toMatchSnapshot();
});

test('update markdown provided', () => {
  update('/foo/bar', () => <h1> Simple Component </h1>);
  expect(renderToJson(<MarkdownProvider />)).toMatchSnapshot();
});

test('sets first page and root from index file', () => {
  update('/foo/bar', () => <h1> Simple Component </h1>, true, '/first/page');
  expect(renderToJson(<MarkdownProvider />)).toMatchSnapshot();
});

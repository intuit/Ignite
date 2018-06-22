import React from 'react';

import DocsPage from '../DocsPage';
import renderToJson from './utils/render-to-json';

test('DocsPage', () => {
  expect(
    renderToJson(<DocsPage Page={() => {}} location={{ pathname: '/' }} />)
  ).toMatchSnapshot();
});

test('DocsPage - with hash id', () => {
  expect(
    renderToJson(
      <DocsPage Page={() => {}} location={{ pathname: '/', hash: 'someId' }} />
    )
  ).toMatchSnapshot();
});

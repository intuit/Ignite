import React from 'react';

import SearchResult from '../SearchResult';
import renderToJson from './utils/render-to-json';

test('SearchResult', () => {
  expect(
    renderToJson(
      <SearchResult
        baseURL="/"
        fileName="foo.md"
        results={['text results for foo.md']}
      />
    )
  ).toMatchSnapshot();
});

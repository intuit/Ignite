import React from 'react';

import SearchResults from '../SearchResults';
import renderToJson from './utils/render-to-json';

test('Icon', () => {
  expect(
    renderToJson(
      <SearchResults
        searchResults={[
          ['foo.md', ['text results for foo.md']],
          ['bar.md', ['text results for bar.md']]
        ]}
      />
    )
  ).toMatchSnapshot();
});

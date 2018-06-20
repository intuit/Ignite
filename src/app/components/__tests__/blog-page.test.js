import React from 'react';

import BlogPage from '../BlogPage';
import renderToJson from './utils/render-to-json';

test('BlogPage', () => {
  expect(renderToJson(<BlogPage Page={() => {}} />)).toMatchSnapshot();
});

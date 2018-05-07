import React from 'react';

import Footer from '../Footer';
import renderToJson from './utils/render-to-json';

test('Footer', () => {
  expect(renderToJson(<Footer />)).toMatchSnapshot();
});

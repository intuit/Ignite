import React from 'react';

import Footer from '../Footer';
import renderToJson from './utils/renderToJson';

test('Footer', () => {
  expect(renderToJson(<Footer />)).toMatchSnapshot();
});

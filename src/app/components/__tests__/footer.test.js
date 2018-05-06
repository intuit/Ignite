import React from 'react';

import Footer from '../Footer';
import renderToJson from './util';

test('Footer', () => {
  expect(renderToJson(<Footer />)).toMatchSnapshot();
});

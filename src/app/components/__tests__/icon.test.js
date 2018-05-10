import React from 'react';

import Icon from '../Icon';
import renderToJson from './utils/render-to-json';

test('Icon', () => {
  expect(renderToJson(<Icon type="fab" icon="github" />)).toMatchSnapshot();
});

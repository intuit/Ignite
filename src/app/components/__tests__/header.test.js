import React from 'react';

import Header from '../Header';
import renderToJson from './utils/render-to-json';

test('renders title', () => {
  expect(renderToJson(<Header title="Super Cool Docs" />)).toMatchSnapshot();
});

test('renders githubURL', () => {
  expect(
    renderToJson(<Header githubURL="https://github.com/sindresorhus/cows" />)
  ).toMatchSnapshot();
});

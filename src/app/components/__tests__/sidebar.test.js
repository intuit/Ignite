import React from 'react';

import SideBar from '../Sidebar';
import renderToJson from './utils/render-to-json';

test('only renders content if its there', () => {
  expect(renderToJson(<SideBar />)).toMatchSnapshot();
  expect(
    renderToJson(<SideBar content={() => <h1>beans</h1>} />)
  ).toMatchSnapshot();
});
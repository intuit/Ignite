import React from 'react';
import renderer from 'react-test-renderer';

import { Sidebar } from '../Sidebar';
import renderToJson from './utils/render-to-json';

test('only renders content if its there', () => {
  expect(renderToJson(<Sidebar />)).toMatchSnapshot();
  expect(
    renderToJson(<Sidebar content={() => <h1>beans</h1>} />)
  ).toMatchSnapshot();
});

test('should open and close', () => {
  const component = renderer.create(<Sidebar content={() => <h1>beans</h1>} />);
  const inst = component.getInstance();

  inst.toggleSidebar();
  expect(component.toJSON()).toMatchSnapshot();
  inst.toggleSidebar();
  expect(component.toJSON()).toMatchSnapshot();
});

test('should close when clicked outside', () => {
  const component = renderer.create(<Sidebar content={() => <h1>beans</h1>} />);
  const inst = component.getInstance();

  inst.toggleSidebar();
  expect(component.toJSON()).toMatchSnapshot();
  inst.handleClickOutside();
  expect(component.toJSON()).toMatchSnapshot();
});

import React from 'react';
import renderer from 'react-test-renderer';

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

test('renders logo', () => {
  expect(
    renderToJson(<Header logo="https://github.com/sindresorhus/cows" />)
  ).toMatchSnapshot();
});

test('clicking hamburger changes state', () => {
  const component = renderer.create(<Header location={{ pathname: '/' }} />);
  const inst = component.getInstance();

  inst.onClickHamburger();
  expect(component.toJSON()).toMatchSnapshot();
});

test('renders nav items', () => {
  expect(
    renderToJson(
      <Header
        location={{ pathname: '/' }}
        navItems={{
          root: '/',
          'Doc 1': '/',
          'Doc 2': 'pages'
        }}
      />
    )
  ).toMatchSnapshot();
});

test('renders nav items with just a index', () => {
  process.env.index = 'index.md';
  expect(
    renderToJson(
      <Header
        location={{ pathname: '/foo' }}
        navItems={{
          root: '/',
          'Doc 1': 'other/index.md',
          'Doc 2': 'pages'
        }}
      />
    )
  ).toMatchSnapshot();
});

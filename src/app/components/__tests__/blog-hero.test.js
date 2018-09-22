import React from 'react';

import BlogHero from '../BlogHero';
import renderToJson from './utils/render-to-json';

test('BlogHero - page - no hero', () => {
  expect(
    renderToJson(
      <BlogHero
        baseURL="/"
        location={{ pathname: '/blog/page', hash: '', search: '' }}
      />
    )
  ).toMatchSnapshot();
});

test('BlogHero - page - hero', () => {
  expect(
    renderToJson(
      <BlogHero
        baseURL="/"
        blogHero="https://some.link"
        location={{ pathname: '/blog/page', hash: '', search: '' }}
      />
    )
  ).toMatchSnapshot();
});

test('BlogHero - index has title', () => {
  expect(
    renderToJson(
      <BlogHero
        baseURL="/"
        location={{ pathname: '/blog', hash: '', search: '' }}
      />
    )
  ).toMatchSnapshot();
});

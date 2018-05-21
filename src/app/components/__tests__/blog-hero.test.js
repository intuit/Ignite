import React from 'react';

import BlogHero from '../BlogHero';
import renderToJson from './utils/render-to-json';

test('BlogHero - page - no hero', () => {
  expect(
    renderToJson(
      <BlogHero
        location={{ pathname: '/blog/page.md', hash: '', search: '' }}
      />
    )
  ).toMatchSnapshot();
});

test('BlogHero - page - hero', () => {
  expect(
    renderToJson(
      <BlogHero
        blogHero="https://some.link"
        location={{ pathname: '/blog/page.md', hash: '', search: '' }}
      />
    )
  ).toMatchSnapshot();
});

test('BlogHero - index has title', () => {
  expect(
    renderToJson(
      <BlogHero
        location={{ pathname: '/blog/index.md', hash: '', search: '' }}
      />
    )
  ).toMatchSnapshot();
});

import render from '../front-matter-render';

test('front-matter-render - simple author', () => {
  expect(
    render([
      {
        markup: `---\ntitle: First Post\nauthor: Andrew Lisowski\n---`
      }
    ])
  ).toMatchSnapshot();
});

test('front-matter-render - complex author', () => {
  expect(
    render([
      {
        markup: `---\ntitle: First Post\nauthor:\n  name: Andrew Lisowski\n  url: https://github.intuit.com/alisowski\n  email: lisowski54@gmail.com\n---`
      }
    ])
  ).toMatchSnapshot();
});

test('front-matter-render - banner image', () => {
  expect(
    render([
      {
        markup: `---\ntitle: First Post\nimage: https://pbs.twimg.com/profile_banners/7547562/1516584955/1500x500\n---`
      }
    ])
  ).toMatchSnapshot();
});

test('front-matter-render - error', () => {
  expect(() =>
    render([
      {
        markup: `---\ntitle= First Post\nauthor: Andrew Lisowski\n---`
      }
    ])
  ).toThrow();
});

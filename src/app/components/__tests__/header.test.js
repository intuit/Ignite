import React from 'react';
import snapshotDiff from 'snapshot-diff';
import { render, fireEvent, cleanup } from 'react-testing-library';

import Header from '../Header';

afterEach(cleanup);

describe('header', () => {
  beforeAll(() => {
    process.env.baseURL = '/';
    process.env.index = 'index.md';
    window.configuration = { markdown: [] };
  });

  test('renders title', () => {
    const titleText = 'Super Cool Docs';
    const { getByText } = render(<Header title={titleText} />);
    expect(getByText(titleText)).toBeDefined();
  });

  test('renders githubURL', () => {
    const githubURL = 'https://github.com/sindresorhus/cows';
    const { getByText } = render(<Header githubURL={githubURL} />);
    expect(getByText('GitHub')).toBeDefined();
  });

  test('renders logo', () => {
    const logo = 'https://github.com/sindresorhus/cows';
    const { getByAltText } = render(<Header logo={logo} />);
    expect(getByAltText('logo')).toBeDefined();
  });

  test('renders nav items', () => {
    const { getByText } = render(
      <Header
        location={{ hash: '', search: '', pathname: '/' }}
        navItems={{
          root: '/',
          'Doc 1': '/',
          'Doc 2': 'pages'
        }}
      />
    );

    expect(getByText('Doc 1')).toBeDefined();
    expect(getByText('Doc 2')).toBeDefined();
  });

  test('render active for blogs', () => {
    window.configuration = { markdown: [['/blog/page.md']] };
    const { getByText } = render(
      <Header location={{ hash: '', search: '', pathname: '/blog/page.md' }} />
    );
    expect(getByText('Blog')).toBeDefined();
  });

  test('hamburger toggles menu', () => {
    const setSearchResults = jest.fn();
    const { getByLabelText, container: Container1 } = render(
      <Header setSearchResults={setSearchResults} />
    );
    fireEvent.click(getByLabelText('menu'));

    const { getByLabelText: getByLabelText2, container: Container2 } = render(
      <Header setSearchResults={setSearchResults} />
    );

    expect(snapshotDiff(Container1, Container2)).toMatchSnapshot();
    fireEvent.click(getByLabelText2('menu'));
    expect(snapshotDiff(Container1, Container2)).toMatchSnapshot();
  });
});

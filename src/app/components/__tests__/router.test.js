import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';

import getLocation from '../Router/get-location';
import Link from '../Router/link';
import Router from '../Router';

afterEach(cleanup);

test('getLocation', () => {
  expect(
    getLocation({
      href: 'href',
      pathname: 'pathname',
      hash: 'hash',
      query: 'query',
      other: true,
      prosp: 1,
      excluded: '1000'
    })
  ).toEqual({
    href: 'href',
    pathname: 'pathname',
    hash: 'hash',
    query: 'query'
  });
});

describe('Link', () => {
  test('works with just a to', () => {
    const { getByText, container } = render(
      <Link to="/somePath">Some Path</Link>
    );

    fireEvent.click(getByText('Some Path'));
    expect(container.firstChild).toMatchSnapshot();
  });

  test('calls onClick function', () => {
    const windowHistoryChanged = jest.fn();
    const { getByText } = render(
      <Link to="/somePath" onClick={windowHistoryChanged}>
        Some Path
      </Link>
    );

    fireEvent.click(getByText('Some Path'));

    expect(windowHistoryChanged).toHaveBeenCalled();
  });
});

describe('Router', () => {
  test('passes location to children', () => {
    const { container } = render(
      <Router>
        <div />
      </Router>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('updates location on window events', () => {
    const { container } = render(
      <Router>
        <div />
      </Router>
    );

    dispatchEvent(
      new CustomEvent('changeLocation', {
        detail: new URL('http://localhost/otherPath')
      })
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});

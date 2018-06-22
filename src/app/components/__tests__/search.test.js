import React from 'react';

import Search, { indexOfAll, lineWithCodeBlock, getLines } from '../Search';
import renderToJson from './utils/render-to-json';

describe('Search', () => {
  test('should render a search', () => {
    expect(
      renderToJson(
        <Search
          searchIndex={[
            { id: 'page.md', body: 'all the markdown text for page.md' }
          ]}
        />
      )
    ).toMatchSnapshot();
  });

  test('should not render a search in static mode', () => {
    expect(
      renderToJson(
        <Search
          static
          searchIndex={[
            { id: 'page.md', body: 'all the markdown text for page.md' }
          ]}
        />
      )
    ).toBeNull();
  });
});

test('indexOfAll', () => {
  expect(
    indexOfAll(
      'asdf adsf asdf foo asdfkasjfdlasd foo asdjfkasjdf fo asdjfajsdf foo asjdfajsdf',
      'foo'
    )
  ).toEqual([15, 34, 64]);
});

test('lineWithCodeBlock', () => {
  expect(
    lineWithCodeBlock('foo ``` foo bar baz foo ``` `foo` `foo bar foo ', 'foo')
  ).toBe('**foo** ``` foo bar baz foo ``` `foo` `**foo** bar **foo** ');
});

test('getLines', () => {
  const term = 'foo';
  const source = `
    Some line without any term.

    foo \`foo\`

    more 
    lines

    foobar baz.
  `;
  const indexes = indexOfAll(source, term);
  expect(getLines(source, indexes, term)).toEqual(
    new Set(['    **foo** `foo`', '    **foo**bar baz.'])
  );
});

import MarkdownIt from 'markdown-it';

import makePlugin, { parseArgs } from '../ignite-plugin';

describe('parseArgs', () => {
  test('should parse options', () => {
    expect(parseArgs('somePlugin name')).toEqual({
      options: ['name'],
      props: {}
    });

    expect(parseArgs('somePlugin name email password')).toEqual({
      options: ['name', 'email', 'password'],
      props: {}
    });
  });

  describe('props', () => {
    test('should parse strings', () => {
      expect(parseArgs('somePlugin name=Andrew')).toEqual({
        options: [],
        props: {
          name: 'Andrew'
        }
      });

      expect(parseArgs('somePlugin name="Andrew"')).toEqual({
        options: [],
        props: {
          name: 'Andrew'
        }
      });
    });

    test('should parse numbers', () => {
      expect(parseArgs('somePlugin number=666')).toEqual({
        options: [],
        props: {
          number: 666
        }
      });
    });

    test('should parse booleans', () => {
      expect(parseArgs('somePlugin on=true off=false')).toEqual({
        options: [],
        props: {
          on: true,
          off: false
        }
      });
    });

    test('should parse arrays', () => {
      expect(
        parseArgs('somePlugin array=["Some string", "Some Other String"]')
      ).toEqual({
        options: [],
        props: {
          array: ['Some string', 'Some Other String']
        }
      });

      expect(parseArgs('somePlugin array=[1, 5, true, false]')).toEqual({
        options: [],
        props: {
          array: [1, 5, true, false]
        }
      });
    });

    test('should parse object', () => {
      expect(
        parseArgs(
          'somePlugin object={ "foo": ["Some string", "Some Other String"] }'
        )
      ).toEqual({
        options: [],
        props: {
          object: { foo: ['Some string', 'Some Other String'] }
        }
      });
    });
  });
});

test('makePlugin', () => {
  const plugin = makePlugin('test');
  const md = new MarkdownIt().use(plugin);

  expect(md.render('::: test')).toMatchSnapshot();
  expect(md.render('::: test with some options')).toMatchSnapshot();
  expect(md.render('::: test with=some props=10')).toMatchSnapshot();
  expect(md.render('::: test with both props=options')).toMatchSnapshot();
});

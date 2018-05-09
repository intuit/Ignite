import MarkdownIt from 'markdown-it';

import makePlugin, { parseArgs } from '../ignite-plugin';

describe('parseArgs', () => {
  test('should parse options', () => {
    expect(parseArgs('somePlugin name')).toEqual({
      options: ['name'],
      properties: {}
    });

    expect(parseArgs('somePlugin name email password')).toEqual({
      options: ['name', 'email', 'password'],
      properties: {}
    });
  });

  describe('propertiesd', () => {
    test('should parse strings', () => {
      expect(parseArgs('somePlugin name=Andrew')).toEqual({
        options: [],
        properties: {
          name: 'Andrew'
        }
      });

      expect(parseArgs('somePlugin name="Andrew"')).toEqual({
        options: [],
        properties: {
          name: 'Andrew'
        }
      });
    });

    test('should parse numbers', () => {
      expect(parseArgs('somePlugin number=666')).toEqual({
        options: [],
        properties: {
          number: 666
        }
      });
    });

    test('should parse booleans', () => {
      expect(parseArgs('somePlugin on=true off=false')).toEqual({
        options: [],
        properties: {
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
        properties: {
          array: ['Some string', 'Some Other String']
        }
      });

      expect(parseArgs('somePlugin array=[1, 5, true, false]')).toEqual({
        options: [],
        properties: {
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
        properties: {
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
  expect(md.render('::: test with=some properties=10')).toMatchSnapshot();
  expect(md.render('::: test with both properties=options')).toMatchSnapshot();
});

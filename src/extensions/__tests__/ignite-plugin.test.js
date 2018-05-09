import MarkdownIt from 'markdown-it';
import { parseArgs } from '../ignite-plugin';

// const md = new MarkdownIt().use(tag);

// test('bulma - tag', () => {
//   expect(md.render('#:is-info useful information')).toMatchSnapshot();
//   expect(md.render('#:is-success:is-large extension')).toMatchSnapshot();
// });

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
  });
});

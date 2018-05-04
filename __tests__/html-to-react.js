import { insertInString, sanitizeJSX } from '../src/html-to-react';

test('insertString', () => {
  expect(insertInString('1245', '3', 2)).toBe('12345');
});

test('sanitizeJSX', () => {
  expect(
    sanitizeJSX(`
    <code>
      function foo() {
        console.log('foo');
      }
    </code>
  `)
  ).toMatchSnapshot();

  expect(
    sanitizeJSX(`
    <code>
      function foo() {
        console.log('foo');
      }
    </code>
    <code>
      function bar() {
        console.log('bar');
      }
    </code>
`)
  ).toMatchSnapshot();

  expect(
    sanitizeJSX(`
    {
      some: 'object
    }
  `)
  ).toBe();
});

import { insertInString, sanitizeJSX } from '../../src/loaders/html-to-react';

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
  ).toMatchSnapshot();
});

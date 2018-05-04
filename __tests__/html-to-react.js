import { insertInString, injectPreTemplate } from '../src/html-to-react';

test('insertString', () => {
  expect(insertInString('1245', '3', 2)).toBe('12345')
});

test('injectPreTemplate', () => {
  expect(injectPreTemplate(`
    <code>
      function foo() {
        console.log('foo');
      }
    </code>
  `)).toMatchSnapshot()

  expect(injectPreTemplate(`
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
`)).toMatchSnapshot()
});

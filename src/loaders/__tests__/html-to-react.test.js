import { sanitizeJSX } from '../html-to-react';

test('sanitizeJSX', () => {
  expect(sanitizeJSX('Something with a `backtick`.')).toBe(
    'Something with a \\`backtick\\`.'
  );
});

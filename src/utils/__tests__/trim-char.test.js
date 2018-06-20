import trimChar from '../trim-char';

test('trimChar', () => {
  expect(trimChar('\\\\foo\\\\', '\\')).toBe('foo');
  expect(trimChar(']]]foo]]]', ']')).toBe('foo');
});

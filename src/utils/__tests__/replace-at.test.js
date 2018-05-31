import replaceAt from '../replace-at';

test('replaceAt', () => {
  expect(replaceAt('A dog barked loudly', 'dog', 'wolf', 2)).toBe(
    'A wolf barked loudly'
  );
});

import { initPlugins, getAuthor } from '../ignite';

test('initPlugins - no init', async () => {
  const options = await initPlugins({
    plugins: [['name', './src/__tests__/utils/']]
  });
  expect(options).toEqual({
    plugins: [['name', './src/__tests__/utils/', {}]]
  });
});

test('initPlugins - no options', async () => {
  const options = await initPlugins({
    plugins: [['name', './src/__tests__/utils/testPlugin']]
  });
  expect(options).toEqual({
    plugins: [
      ['name', './src/__tests__/utils/testPlugin', { _initData: 'foo' }]
    ]
  });
});

test('initPlugins - with options', async () => {
  const options = await initPlugins({
    plugins: [['name', './src/__tests__/utils/testPlugin', { bar: 'baz' }]]
  });
  expect(options).toEqual({
    plugins: [
      [
        'name',
        './src/__tests__/utils/testPlugin',
        { _initData: 'foo', bar: 'baz' }
      ]
    ]
  });
});

test('getAuthor', () => {
  expect(getAuthor()).not.toEqual({});
});

import path from 'path';
import {
  initOptions,
  initPlugins,
  initBlogPosts,
  initSearchIndex,
  initBuildMessages,
  getAuthor
} from '../ignite';

describe('initPlugins', () => {
  test('should initialize options', async () => {
    const result = await initPlugins({
      plugins: [['pluginName', '../extensions/notRealExtension/']]
    });
    expect(result).toEqual({
      plugins: [['pluginName', '../extensions/notRealExtension/', {}]]
    });
  });

  test('should call init function if present', async () => {
    const pluginPath = path.resolve('src/extensions/testExtension/');
    const result = await initPlugins({
      plugins: [['pluginName', pluginPath, { foo: 'bar' }]]
    });
    expect(result).toMatchSnapshot();
  });
});

describe('initBlogPosts', () => {
  test('do nothing with when docs contain no blog posts', async () => {
    const result = await initBlogPosts({ src: '/' });
    expect(result).toBeNull();
  });

  test('attach creation date to each blog post', async () => {
    const result = await initBlogPosts({
      src: 'examples/blog/docs'
    });
    expect(result).toEqual([
      { birth: 1526593244000, path: 'blog/FirstPost.md' },
      { birth: 1526623637000, path: 'blog/ShorterPost.md' }
    ]);
  });
});

test('getAuthor', () => {
  expect(getAuthor()).toEqual({
    email: 'andrew_lisowski@intuit.com',
    name: 'Andrew Lisowski'
  });
});

test('initSearchIndex', async () => {
  const result = await initSearchIndex({
    baseURL: '/',
    src: path.resolve('examples/multi-root/docs')
  });
  expect(result).toMatchSnapshot();
});

test('initBuildMessages', () => {
  const prod = initBuildMessages({});
  const dev = initBuildMessages({
    watch: true
  });

  expect(dev.compilationSuccessInfo).not.toEqual(prod.compilationSuccessInfo);
});

describe('initOptions', () => {
  test('uses rc file', async () => {
    const result = await initOptions({
      src: path.resolve('examples/multi-root/docs')
    });
    expect(result).toMatchSnapshot();
  });
});

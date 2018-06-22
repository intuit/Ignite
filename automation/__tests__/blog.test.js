import start from '../utils/start';
import visit from '../utils/visit';

describe('Blog', () => {
  let docs;

  beforeAll(async () => {
    jest.setTimeout(10 * 1000);
    docs = await start('examples/blog/docs');
  });

  afterAll(() => docs.close());

  test('should display correct title', async () => {
    const page = await visit('/');
    const docTitle = await page.evaluate(() => document.title);

    expect(docTitle).toBe('Blog');
  });

  test('should display correct title', async () => {
    const page = await visit('/');

    await page.click('.navbar-burger');
    await page.click('.navbar-end a:nth-of-type(2)');
    await page.waitFor('.blogIndex');

    const blogPosts = await page.$$('.blogPost');

    expect(blogPosts.length).toBe(2);
  });
});

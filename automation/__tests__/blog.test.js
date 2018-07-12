import start from '../utils/start';
import createPage from '../utils/create-page';

describe('Blog', () => {
  let visit;
  let docs;

  beforeAll(async () => {
    const port = 8000;
    jest.setTimeout(20 * 1000);
    docs = await start(port, 'examples/blog/docs');
    visit = path => createPage(port, path);
  });

  afterAll(() => docs.app.stop());

  test('should display correct title', async () => {
    const page = await visit('/');
    const docTitle = await page.evaluate(() => document.title);

    expect(docTitle).toBe('Blog');
  });

  test('should have correct amount of blog posts', async () => {
    const page = await visit('/');

    await page.click('.navbar-burger');
    await page.click('.navbar-end a:nth-of-type(2)');
    await page.waitFor('.blogIndex');

    const blogPosts = await page.$$('.blogPost');

    expect(blogPosts.length).toBe(2);
  });
});

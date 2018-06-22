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
    const docTitle = await visit('/')
      .evaluate(() => document.title)
      .end();

    expect(docTitle).toBe('Blog');
  });

  // test('should display correct title', async () => {
  //   const blogPosts = await visit('/')
  //     .click('.navbar-burger')
  //     .wait(2000)
  //     .click('.navbar-end a:nth-of-type(2)')
  //     .wait(2000)
  //     .evaluate(() => document.querySelectorAll('.blogPost'))
  //     .end();

  //   console.log(blogPosts);
  //   expect(blogPosts).toBe(2);
  // });
});

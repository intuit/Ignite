import ignite from '../../src/ignite';
import createPage from '../utils/create-page';

describe('Static', () => {
  let visit;
  let docs;

  beforeAll(async () => {
    const port = 8005;
    jest.setTimeout(20 * 1000);
    docs = await ignite({
      port,
      src: 'examples/blog/docs',
      open: false,
      static: true,
      log: false
    });
    visit = path => createPage(port, path);
  });

  afterAll(() => docs.close());

  test('should display correct title', async () => {
    const page = await visit('/');
    const docTitle = await page.evaluate(() => document.title);

    expect(docTitle).toBe('Blog');
  });
});

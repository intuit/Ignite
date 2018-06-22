import start from '../utils/start';
import createPage from '../utils/create-page';

describe('Home Page', () => {
  let visit;
  let docs;

  beforeAll(async () => {
    const port = 8002;
    jest.setTimeout(20 * 1000);
    docs = await start(port, 'examples/multi-root/docs');
    visit = path => createPage(port, path);
  });

  afterAll(() => docs.close());

  test('should display correct title', async () => {
    const page = await visit('/');
    const docTitle = await page.evaluate(() => document.title);

    expect(docTitle).toBe('Multi Root');
  });

  test('should navigate to each root', async () => {
    const page = await visit('/');

    let pageTitle = await page.evaluate(
      () => document.querySelector('.content h1').textContent
    );

    expect(pageTitle).toBe('First Page');

    await page.click('.navbar-burger');
    await page.click('.navbar-end a:nth-of-type(2)');
    await page.waitFor('.secondPage');

    pageTitle = await page.evaluate(
      () => document.querySelector('.content h1').textContent
    );

    expect(pageTitle).toBe('Second Page');

    await page.click('.navbar-end a:nth-of-type(1)');
    await page.waitFor('.firstPage');

    pageTitle = await page.evaluate(
      () => document.querySelector('.content h1').textContent
    );

    expect(pageTitle).toBe('First Page');
  });
});

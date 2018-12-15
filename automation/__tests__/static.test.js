import ignite from '../../src/ignite';
import createPage from '../utils/create-page';
import { startServer } from '../../src/create-static-site';

describe('Static', () => {
  const baseURL = '/my/baseURL/';
  let server;
  let visit;

  beforeAll(async () => {
    jest.setTimeout(100 * 1000);
    const port = 8005;
    const options = {
      port,
      baseURL,
      dst: '_ignite',
      src: 'examples/multi-root/docs',
      open: false,
      static: true,
      log: false
    };

    await ignite(options);
    server = startServer(options);
    await new Promise(resolve => {
      server.listen(options.port, resolve);
    });

    visit = path => createPage(port, path);
  });

  afterAll(() => {
    server.close();
  });

  test('should display correct title', async () => {
    const page = await visit(baseURL);
    const docTitle = await page.evaluate(() => document.title);

    expect(docTitle).toBe('Multi Root');
  });

  test('should navigate to each root', async () => {
    const page = await visit(baseURL);

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

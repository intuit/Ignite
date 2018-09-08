import start from '../utils/start';
import createPage from '../utils/create-page';

describe('Home Page', () => {
  let visit;
  let docs;

  beforeAll(async () => {
    const port = 8001;
    jest.setTimeout(20 * 1000);
    docs = await start(port, 'examples/home/docs');
    visit = path => createPage(port, path);
  });

  afterAll(() => docs.app.stop());

  test('should display correct title', async () => {
    const page = await visit('/');
    const docTitle = await page.evaluate(() => document.title);

    expect(docTitle).toBe('Home Page');
  });

  test('should have a home page linked to in the brand', async () => {
    const page = await visit('/');

    await page.click('.navbar-brand .navbar-item');
    await page.waitFor('.homePage');

    const heroTitle = await page.evaluate(
      () => document.querySelector('.hero .title').textContent
    );

    expect(heroTitle).toBe('Home Page');
  });

  test('should have multiple docs pages', async () => {
    const page = await visit('/');

    let pageTitle = await page.evaluate(
      () => document.querySelector('.content h1').textContent
    );

    expect(pageTitle).toBe('A page of Content');

    await page.click('.menu-list li:nth-child(2) a');
    await page.waitFor('.menu-list li:nth-child(2) a.is-active');

    pageTitle = await page.evaluate(
      () => document.querySelector('.content h1').textContent
    );

    expect(pageTitle).toBe('Another Title');

    await page.click('.menu-list li:nth-child(1) a');
    await page.waitFor('.menu-list li:nth-child(1) a.is-active');

    pageTitle = await page.evaluate(
      () => document.querySelector('.content h1').innerText
    );

    expect(pageTitle).toBe('A page of Content');
  });

  test('search bar works', async () => {
    const page = await visit('/');

    await page.setViewport({ height: 800, width: 1000 });

    await page.click('.navbar-burger');
    await page.type('input', 'page');
    await page.click('.card a');
    await page.waitFor('.homePage');

    const heroTitle = await page.evaluate(
      () => document.querySelector('.hero .title').innerText
    );

    expect(heroTitle).toBe('Home Page');

    await page.click('input', { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type('input', 'page');
    await page.waitFor('.card:nth-child(3) a');
    await page.click('.card:nth-child(3) a');
    await page.waitFor('.content');

    const pageTitle = await page.evaluate(
      () => document.querySelector('.content h1').innerText
    );

    expect(pageTitle).toBe('A page of Content');
  });
});

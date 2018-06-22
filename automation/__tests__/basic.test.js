import start from '../utils/start';
import createPage from '../utils/create-page';

describe('Home Page', () => {
  let visit;
  let docs;

  beforeAll(async () => {
    const port = 8001;
    jest.setTimeout(10 * 1000);
    docs = await start(port, 'examples/home/docs');
    visit = path => createPage(port, path);
  });

  afterAll(() => docs.close());

  test('should display correct title', async () => {
    const page = await visit('/');
    const docTitle = await page.evaluate(() => document.title);

    expect(docTitle).toBe('Home Page');
  });

  // test('should have a home page linked to in the brand', async () => {
  //   const heroTitle = await visit('/')
  //     .click('.navbar-brand .navbar-item')
  //     .wait('.homePage')
  //     .evaluate(() => document.querySelector('.hero .title').innerText)
  //     .end();

  //   expect(heroTitle).toBe('Home Page');
  // });

  // test('should have multiple docs pages', async () => {
  //   const page = visit('/');

  //   let pageTitle = await page.evaluate(
  //     () => document.querySelector('.content h1').innerText
  //   );

  //   expect(pageTitle).toBe('A page of Content');

  //   pageTitle = await page
  //     .click('.menu-list li:nth-child(2) a')
  //     .wait('.menu-list li:nth-child(2) a.is-active')
  //     .evaluate(() => document.querySelector('.content h1').innerText);

  //   expect(pageTitle).toBe('Another Title');

  //   pageTitle = await page
  //     .click('.menu-list li:nth-child(1) a')
  //     .wait('.menu-list li:nth-child(1) a.is-active')
  //     .evaluate(() => document.querySelector('.content h1').innerText)
  //     .end();

  //   expect(pageTitle).toBe('A page of Content');
  // });

  // test('search bar works', async () => {
  //   const page = visit('/');

  //   const heroTitle = await page
  //     .click('.navbar-burger')
  //     .type('input', 'page')
  //     .wait(100) // bug #151
  //     .click('.card a')
  //     .wait('.homePage')
  //     .evaluate(() => document.querySelector('.hero .title').innerText);

  //   expect(heroTitle).toBe('Home Page');

  //   const pageTitle = await page
  //     .type('input', false)
  //     .type('input', 'page')
  //     .wait(1000) // bug #151
  //     .click('.card:nth-child(3) a')
  //     .wait('.content')
  //     .evaluate(() => document.querySelector('.content h1').innerText)
  //     .end();

  //   expect(pageTitle).toBe('A page of Content');
  // });
});

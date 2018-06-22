/* global browser */

import url from 'url';

export default async function createPage(port = 8008, path = '') {
  const BASE_URL = url.format({
    protocol: process.env.PROTOCOL || 'http',
    hostname: process.env.HOST || 'localhost',
    port
  });

  const location = url.resolve(BASE_URL, path);
  const page = await browser.newPage();

  await page.goto(location);

  return page;
}

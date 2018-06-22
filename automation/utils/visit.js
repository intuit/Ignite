/* global browser */

import url from 'url';

const BASE_URL = url.format({
  protocol: process.env.PROTOCOL || 'http',
  hostname: process.env.HOST || 'localhost',
  port: process.env.PORT || 8008
});

export default async function visit(path = '') {
  const location = url.resolve(BASE_URL, path);
  const page = await browser.newPage();

  await page.goto(location);

  return page;
}

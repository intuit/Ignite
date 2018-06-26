#!/usr/bin/env node

import fs from 'fs';
import url from 'url';
import path from 'path';
import http from 'http';
import mkdirp from 'mkdirp';
import root from 'root-path';

import handler from 'serve-handler';
import puppeteer from 'puppeteer';

const startServer = options =>
  http.createServer((request, response) => {
    return handler(request, response, {
      cleanUrls: false,
      rewrites: [
        {
          source: path.join(options.baseURL, '**'),
          destination: path.join(options.baseURL, 'index.html')
        }
      ]
    });
  });

const getLinks = async page => {
  const anchors = await page.evaluate(() =>
    [...document.querySelectorAll('a')].map(anchor => anchor.href)
  );

  const iframes = await page.evaluate(() =>
    [...document.querySelectorAll('iframe')].map(iframe => iframe.src)
  );

  return anchors.concat(iframes);
};

const writeHtml = async (page, filePath) => {
  const content = await page.content();

  filePath = path.join(root(), filePath);

  if (filePath.endsWith('.html')) {
    mkdirp.sync(path.dirname(filePath));
    fs.writeFileSync(filePath, content);
  }
};

export default function createStaticSite(options) {
  const server = startServer(options);

  return new Promise(resolve =>
    server.listen(options.port, async () => {
      console.warn(`server is listening on ${options.port}`);
      console.warn('Generating static page for:');

      const rootIndex = path
        .join(options.baseURL, options.index)
        .replace('.md', '.html');
      const browser = await puppeteer.launch();
      const linksVisited = new Set();
      const linksToVisit = new Set([
        url.resolve(`http://localhost:${options.port}`, options.baseURL)
      ]);

      async function processLink() {
        const [link] = [...linksToVisit];

        if (!link) {
          const page = await browser.newPage();
          await page.setViewport({ width: 1200, height: 1000 });
          await page.goto(
            url.resolve(`http://localhost:${options.port}`, rootIndex)
          );
          await writeHtml(page, rootIndex);
          browser.close();
          server.close();
          resolve();
          return;
        }

        console.warn('**', link);
        linksToVisit.delete(link);
        linksVisited.add(link);

        const page = await browser.newPage();
        await page.setViewport({ width: 1200, height: 1000 });
        await page.goto(link);

        const newLinks = await getLinks(page);
        newLinks
          .filter(
            link =>
              link !== '' &&
              link.includes(`localhost:${options.port}`) &&
              link.includes('.html')
          )
          .forEach(link => {
            const [newLink] = link.split('#');

            if (!linksVisited.has(newLink)) {
              linksToVisit.add(newLink);
            }
          });

        const file = url.parse(link).pathname;
        if (file !== rootIndex) {
          await writeHtml(page, file);
        }
        page.close();
        processLink();
      }

      return processLink();
    })
  );
}

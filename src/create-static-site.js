#!/usr/bin/env node

import fs from 'fs';
import url from 'url';
import path from 'path';
import http from 'http';
import mkdirp from 'mkdirp';
import root from 'root-path';
import cpy from 'cpy';

import handler from 'serve-handler';
import puppeteer from 'puppeteer';

export const startServer = options =>
  http.createServer((request, response) =>
    handler(request, response, {
      public: options.dst,
      cleanUrls: false,
      rewrites: [
        {
          source: path.join(options.baseURL, '**'),
          destination: path.join(options.baseURL, 'index.html')
        }
      ]
    })
  );

const getLinks = async page => {
  const anchors = await page.evaluate(() =>
    [...document.querySelectorAll('a')].map(anchor => anchor.href)
  );

  const iframes = await page.evaluate(() =>
    [...document.querySelectorAll('iframe')].map(iframe => iframe.src)
  );

  return anchors.concat(iframes);
};

const writeHtml = async (page, filePath, options) => {
  const content = await page.content();

  filePath = path.join(root(), options.dst, 'static', filePath);

  if (filePath.endsWith('.html')) {
    mkdirp.sync(path.dirname(filePath));
    fs.writeFileSync(filePath, content);
  }
};

export default function createStaticSite(options) {
  const server = startServer(options);
  const log = (...string) => options.log && console.warn(...string);

  return new Promise(resolve =>
    server.listen(options.port, async () => {
      log(`server is listening on ${options.port}`);
      log('Generating static page for:');

      const rootIndex = path
        .join(options.baseURL, options.index)
        .replace('.md', '');
      const browser = await puppeteer.launch();
      const linksVisited = new Set();
      const linksToVisit = new Set([
        url.resolve(`http://localhost:${options.port}`, options.baseURL)
      ]);

      await cpy(
        ['*.css', '*.js', '**/*.{png,svg,gif,jpg,jpeg}'],
        path.join(root(), options.dst, 'static', options.baseURL),
        {
          parents: true,
          cwd: path.join(root(), options.dst, options.baseURL)
        }
      );

      async function processLink() {
        const [link] = [...linksToVisit];

        if (!link) {
          const page = await browser.newPage();
          await page.setViewport({ width: 1200, height: 1000 });
          await page.goto(
            url.resolve(`http://localhost:${options.port}`, rootIndex)
          );
          await writeHtml(page, rootIndex, options);
          browser.close();
          server.close();
          resolve();
          return;
        }

        log('**', link);
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
          await writeHtml(page, file, options);
        }
        page.close();
        processLink();
      }

      return processLink();
    })
  );
}

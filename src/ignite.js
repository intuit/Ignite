import 'babel-polyfill';

import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import globby from 'globby';

import transformLinks from 'transform-markdown-links';
import Remarkable from 'remarkable';

const mkDir = promisify(fs.mkdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const markdownRenderer = new Remarkable({ linkify: true });

const writePage = markdown => `
  <html>
    <head>
      <link rel="stylesheet" href="https://unpkg.com/mustard-ui@latest/dist/css/mustard-ui.min.css">
    </head>
    <body>
      ${markdown}
    </body>
  </html>
`;

export default async function build({ src, dst, index }) {
  const docs = await globby([src]);

  if (!fs.existsSync(dst)) {
    await mkDir(dst);
  }

  docs.map(async filePath => {
    let markdown = await readFile(filePath, 'utf8');
    markdown = transformLinks(
      markdown,
      link =>
        path.extname(link, '.md') === '.md'
          ? path.basename(link, '.md') + '.html'
          : link
    );

    const html = writePage(markdownRenderer.render(markdown));
    const base = path.basename(filePath, '.md');
    const destination = filePath.includes(index)
      ? 'index.html'
      : `${base}.html`;

    await writeFile(path.join(dst, destination), html);
  });
}

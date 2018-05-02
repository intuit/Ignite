import 'babel-polyfill';

import path from 'path';
import fs from 'fs-extra';
import globby from 'globby';

import transformLinks from 'transform-markdown-links';
import Remarkable from 'remarkable';

const markdownRenderer = new Remarkable();

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

const replaceInPath = (filePath, toReplace, replacement) => {
  if (toReplace[toReplace.length - 1] === '/') {
    toReplace = toReplace.substring(0, toReplace.length - 1);
  }

  if (replacement[replacement.length - 1] === '/') {
    replacement = replacement.substring(0, replacement.length - 1);
  }

  return filePath.replace(toReplace, replacement);
};

const buildMarkdown = async ({ src, dst, index }) => {
  const srcGlob = path.join(src, '**/*.md');
  const docs = await globby([srcGlob]);

  docs.map(async filePath => {
    let markdown = await fs.readFile(filePath, 'utf8');
    markdown = transformLinks(
      markdown,
      link =>
        path.extname(link, '.md') === '.md'
          ? path.basename(link, '.md') + '.html'
          : link
    );

    const html = writePage(markdownRenderer.render(markdown));
    const baseFile = path.basename(filePath);
    const baseName = path.basename(filePath, '.md');
    const destinationFile = filePath.includes(index)
      ? 'index.html'
      : `${baseName}.html`;

    let destination = replaceInPath(filePath, src, dst);
    destination = replaceInPath(destination, baseFile, destinationFile);

    await fs.ensureDir(path.dirname(destination));
    await fs.writeFile(destination, html);
  });
};

export default async function build(argv) {
  buildMarkdown(argv);
}

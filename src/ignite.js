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

// const

const buildMarkdown = async ({ src, dst, index }) => {
  const docs = await globby([path.join(src, '**/*.md')]);

  docs.map(async filePath => {
    const markdown = transformLinks(
      await fs.readFile(filePath, 'utf8'),
      link =>
        path.extname(link) === '.md' ? link.replace('.md', '.html') : link
    );

    const html = writePage(markdownRenderer.render(markdown));

    const baseFile = path.basename(filePath);
    const destination = replaceInPath(filePath, src, dst);
    const destinationPath = destination.includes(path.join(src, index))
      ? destination.replace(baseFile, 'index.html')
      : destination.replace('.md', '.html');

    await fs.ensureDir(path.dirname(destinationPath));
    await fs.writeFile(destinationPath, html);
  });
};

const includeImages = async ({ src, dst }) => {
  const srcGlob = path.join(src, '**/*.{jpg,jpeg,png,gif}');
  const images = await globby([srcGlob]);

  images.map(async imagePath => {
    const destination = replaceInPath(imagePath, src, dst);
    await fs.ensureDir(path.dirname(destination));
    await fs.copy(imagePath, destination);
  });
};

export default async function build(argv) {
  buildMarkdown(argv);
  includeImages(argv);
}

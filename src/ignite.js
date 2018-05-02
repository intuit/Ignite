import 'babel-polyfill';

import path from 'path';
import fs from 'fs-extra';
import globby from 'globby';
import highlight from 'highlightjs';

import transformLinks from 'transform-markdown-links';
import Remarkable from 'remarkable';

const markdownRenderer = new Remarkable({
  highlight(str, lang) {
    if (lang && highlight.getLanguage(lang)) {
      try {
        return highlight.highlight(lang, str).value;
      } catch (__) {}
    }

    return '';
  }
});

const writePage = markdown => `
  <html>
    <head>
      <link rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/foundation.min.css">
      <link rel="stylesheet" href="https://unpkg.com/mustard-ui@latest/dist/css/mustard-ui.min.css">
    </head>
    <body>
      ${markdown}
    </body>
  </html>
`;

const stripSlash = str => {
  if (str[str.length - 1] === '/') {
    str = str.substring(0, str.length - 1);
  }

  return str;
};

const replaceInPath = (filePath, toReplace, replacement) => {
  return filePath.replace(stripSlash(toReplace), stripSlash(replacement));
};

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

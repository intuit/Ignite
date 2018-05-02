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

export default async function build({
  src = 'docs/**/*.md',
  dst = '_ignite/'
}) {
  const docs = await globby([src]);

  if (!fs.existsSync(dst)) {
    await mkDir(dst);
  }

  docs.map(async filePath => {
    let markdown = await readFile(filePath, 'utf8');
    markdown = transformLinks(
      markdown,
      link => path.basename(link, '.md') + '.html'
    );

    const html = markdownRenderer.render(markdown);
    const base = path.basename(filePath, '.md');

    await writeFile(path.join(dst, `${base}.html`), html);
  });
}

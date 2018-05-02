import 'babel-polyfill';

import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import Remarkable from 'remarkable';

const mkDir = promisify(fs.mkdir);
const readDir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const markdownRenderer = new Remarkable();

export default async function build({ src = 'docs/', dst = '_ignite/' }) {
  const docs = await readDir(src);

  if (!fs.existsSync(dst)) {
    await mkDir(dst);
  }

  docs.map(async file => {
    const markdown = await readFile(path.join(src, file), 'utf8');
    const html = markdownRenderer.render(markdown);
    const base = path.basename(file, '.md');

    await writeFile(path.join(dst, `${base}.html`), html);
  });
}

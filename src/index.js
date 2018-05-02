import fs from 'fs';
import "babel-polyfill";
import { promisify } from 'util';

const readDir = promisify(fs.readdir);

export default async function build({ src = 'docs/' }) {
  const docs = await readDir(src);
  console.log(docs)
}
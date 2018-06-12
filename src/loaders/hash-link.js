import path from 'path';
import transformLinks from 'transform-markdown-links';
import { getOptions } from 'loader-utils';

export function transformLink(resourcePath, link, options) {
  if (!link || link === '' || link.includes('http')) {
    return link;
  }

  if (link[0] === '#') {
    return link;
  }

  const pathToThisSource = path.dirname(path.resolve(resourcePath));
  const pathToLink = path.join(pathToThisSource, link);
  const pathToDocs = path.join(process.cwd(), options.src);
  const correctPath = path.relative(pathToDocs, pathToLink);

  if (path.extname(link).includes('.md')) {
    return path.join(options.baseURL, correctPath).replace('.md', '.html');
  }

  return correctPath;
}

export function transform(source, resourcePath, options) {
  const markdown = transformLinks(source, link =>
    transformLink(resourcePath, link, options)
  );

  return markdown;
}

export default function(source) {
  const options = getOptions(this);
  return transform(source, this.resourcePath, options);
}

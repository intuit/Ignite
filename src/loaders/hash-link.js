import path from 'path';
import transformLinks from 'transform-markdown-links';
import { getOptions } from 'loader-utils';

export function transformLink(resourcePath, link, options) {
  if (!link || link === '' || link.includes('http')) {
    return link;
  }

  const pathToThisSource = path.dirname(path.resolve(resourcePath));

  if (link[0] === '#') {
    return link;
  }

  if (path.extname(link).includes('.md')) {
    const pathToLink = path.join(pathToThisSource, link);
    const pathToDocs = path.join(process.cwd(), options.src);
    const correctPath = path.relative(pathToDocs, pathToLink);

    return path
      .join(
        options.static && !options.watch ? path.join(options.static, '/') : '/',
        correctPath
      )
      .replace('.md', '.html');
  }

  const [filePath, ...description] = link.split(' ');
  const pathToLink = path.join(pathToThisSource, filePath);
  const correctPath = path.relative(process.cwd(), pathToLink);

  return `${correctPath} ${description.join(' ')}`;
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

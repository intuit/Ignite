import path from 'path';
import transformLinks from 'transform-markdown-links';

export default function(source) {
  const markdown = transformLinks(source, link => {
    if (link.includes('http')) {
      return link;
    }

    if (path.extname(link).includes('.md')) {
      return path.join('#', link);
    }

    const [filePath, ...description] = link.split(' ');
    const pathToThisSource = path.dirname(path.resolve(this.resourcePath));
    const pathToLink = path.join(pathToThisSource, filePath);
    const correctPath = path.relative(process.cwd(), pathToLink);

    return `${correctPath} ${description.join(' ')}`;
  });

  return markdown;
}

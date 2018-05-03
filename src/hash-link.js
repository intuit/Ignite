import path from 'path';
import root from 'root-path';
import transformLinks from 'transform-markdown-links';

export default function(source) {
  const markdown = transformLinks(source, link => {
    if (path.extname(link) === '.md') {
      return `#${link}`;
    }

    const [filePath, ...description] = link.split(' ');
    const pathToThisSource = path.dirname(path.resolve(this.resourcePath));
    const pathToLink = path.join(pathToThisSource, filePath);
    const correctPath = path.relative(root(), pathToLink);

    return `${correctPath} ${description.join(' ')}`;
  });

  return markdown;
}

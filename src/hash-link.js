import path from 'path';
import transformLinks from 'transform-markdown-links';

export default function(source) {
  const markdown = transformLinks(
    source,
    link => (path.extname(link) === '.md' ? `#${link}` : link)
  );

  return markdown;
}

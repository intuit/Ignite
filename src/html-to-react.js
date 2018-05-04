import path from 'path';
import unescape from 'unescape';
import { getOptions } from 'loader-utils';

export function insertInString(a, b, position) {
  return a.substr(0, position) + b + a.substr(position);
}

export function sanitizeJSX(source) {
  let codeTag = source.indexOf('<code');

  if (codeTag === -1) {
    return source;
  }

  // ` character will will break the wrapping below
  source = source.replace(new RegExp('`', 'g'), "'");

  while (codeTag !== -1) {
    const endCodeBracket = source.indexOf('>', codeTag);
    source = insertInString(source, '{`', endCodeBracket + 1);

    const endCodeTag = source.indexOf('</code>', endCodeBracket);
    source = insertInString(source, '`}', endCodeTag - 1);

    codeTag = source.indexOf('<code', endCodeTag);
  }

  return source;
}

export default function(source) {
  const options = getOptions(this);
  const pathToMarkdown = path.relative(options.src, this.resourcePath);
  const isIndex = this.resourcePath.includes(
    path.join(options.src, options.index)
  );

  return `
    import ignite from 'ignite';

    function markDownPage() {
      return <div>
        ${sanitizeJSX(unescape(source))}
      </div>
    };
    
    export default ignite('${pathToMarkdown}', markDownPage, ${isIndex});
  `;
}

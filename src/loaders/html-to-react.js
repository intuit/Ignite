import path from 'path';
import unescape from 'unescape';
import { getOptions } from 'loader-utils';

export function sanitizeJSX(source) {
  source = source.replace(new RegExp('`', 'g'), "'");

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
      return (
        <div dangerouslySetInnerHTML={{
          __html: \`${sanitizeJSX(source)}\`
        }}/>
      );
    };
    
    export default ignite('${pathToMarkdown}', markDownPage, ${isIndex});
  `;
}

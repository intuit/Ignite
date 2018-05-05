import path from 'path';
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

    const markDownPage = props => (
      <div className={props.className}>
        <section 
          dangerouslySetInnerHTML={{
            __html: \`${sanitizeJSX(source)}\`
          }}
        />
      </div>
    );
    
    export default ignite('${pathToMarkdown}', markDownPage, ${isIndex});
  `;
}

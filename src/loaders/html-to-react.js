import path from 'path';
import { getOptions } from 'loader-utils';

export default function(source) {
  const options = getOptions(this);
  const pathToMarkdown = path.relative(options.src, this.resourcePath);
  const isIndex = this.resourcePath.includes(
    path.join(options.src, options.index)
  );

  let firstLink;

  if (isIndex) {
    const firstLinkIndex = source.indexOf('<a ');
    const hrefIndex = source.indexOf('href="', firstLinkIndex);
    const startIndex = source.indexOf('/', hrefIndex) + 1;
    const endIndex = source.indexOf('"', startIndex);

    firstLink = source.substring(startIndex, endIndex);
  }

  return `
    import ignite from 'ignite';

    const markDownPage = props => (
      <div className={props.className}>
        <section 
          dangerouslySetInnerHTML={{
            __html: '${source
              .replace(/'/g, "\\'")
              .split('\n')
              .join("\\n' + '")}'
          }}
        />
      </div>
    );
    
    export default ignite('${pathToMarkdown}', markDownPage, ${isIndex}, '${firstLink}');
  `;
}

import path from 'path';
import { getOptions } from 'loader-utils';

function getLink(source, index = 0) {
  const linkIndex = source.indexOf('<a h', index);

  if (linkIndex === -1) {
    return '';
  }

  const hrefIndex = source.indexOf('href="', linkIndex);
  const startIndex = source.indexOf('/', hrefIndex) + 1;
  const endIndex = source.indexOf('"', startIndex);

  return source.substring(startIndex, endIndex);
}

function addActive(source, link, firstLink) {
  source = source.replace(
    new RegExp('<a h'),
    `<a className={'/${link}' === props.currentPage || '${firstLink}' === '${link}' && '/' === props.currentPage ? 'activeSidebar' : null} h`
  );

  return source;
}

function addActiveAll(source, firstLink) {
  let nextLink = getLink(source);

  while (nextLink !== '') {
    source = addActive(source, nextLink, firstLink);
    nextLink = getLink(source);
  }

  return source;
}

function index(source, pathToMarkdown) {
  const firstLink = getLink(source);

  source = addActiveAll(source, firstLink);

  return `
    import ignite from 'ignite';

    function markDownPage(props) {
      const atIndex = props.currentPage === '/';

      return (
        <div className={props.className}>
          <section>
            ${source}
          </section>
        </div>
      );
    }
    
    export default ignite('${pathToMarkdown}', markDownPage, true, '${firstLink}');
  `;
}

export default function(source) {
  const options = getOptions(this);
  const pathToMarkdown = path.relative(options.src, this.resourcePath);
  const isIndex = this.resourcePath.includes(
    path.join(options.src, options.index)
  );

  if (isIndex) {
    return index(source, pathToMarkdown);
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
    
    export default ignite('${pathToMarkdown}', markDownPage);
  `;
}

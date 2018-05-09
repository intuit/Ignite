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
    `<a
      className={
        '/${link}' === props.currentPage ||
        ('${firstLink}' === '${link}' && '/' === props.currentPage)
          ? 'is-active'
          : null
      }
      h`
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
  source = source.replace(
    new RegExp('<ul>', 'g'),
    '<ul className="menu-list">'
  );
  source = source.replace(new RegExp('<p>', 'g'), '<p className="menu-label">');

  return `
    import { registerMarkdown } from 'ignite';
    import makeClass from 'classnames';

    function markDownPage(props) {
      return (
        <aside className={makeClass('menu', props.className)}>
          ${source}
        </aside>
      );
    }
    
    export default registerMarkdown('${pathToMarkdown}', markDownPage, true, '${firstLink}');
  `;
}

export function sanitizeJSX(source) {
  source = source.replace(new RegExp('!{', 'g'), '__CURLY_LEFT__');
  source = source.replace(new RegExp('!}', 'g'), '__CURLY_RIGHT__');

  source = source.replace(new RegExp('`', 'g'), '\\`');
  source = source.replace(new RegExp('{', 'g'), '&#123;');
  source = source.replace(new RegExp('}', 'g'), '&#125;');
  source = source.replace(new RegExp('<br>', 'g'), '<br/>');

  source = source.replace(new RegExp('__CURLY_LEFT__', 'g'), '{');
  source = source.replace(new RegExp('__CURLY_RIGHT__', 'g'), '}');
  source = source.replace(new RegExp('pluginprovider', 'g'), 'PluginProvider');

  return source;
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

  source = source.replace(
    new RegExp('highlighted-line', 'g'),
    'highlighted-line hero is-primary'
  );

  return `
    import React from 'react';
    import { registerMarkdown } from 'ignite';

    const PluginProvider = ({plugins, name, options}) => {
      console.log(plugins, name)
      let Plugin = plugins[name];
    
      if (!Plugin) {
        return <div />;
      }
    
      Plugin = Plugin.component;

      return <Plugin {...options} />;
    };

    const markDownPage = props => (
      <div className={props.className}>
        <section >
          ${sanitizeJSX(source)}
        </section>
      </div>
    );
    
    export default registerMarkdown('${pathToMarkdown}', markDownPage);
  `;
}

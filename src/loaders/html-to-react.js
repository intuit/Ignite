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

  // Some of the curlies need to stay to pass props to the plugin component
  source = source.replace(new RegExp('!{', 'g'), '__CURLY_LEFT__');
  source = source.replace(new RegExp('!}', 'g'), '__CURLY_RIGHT__');
  source = addActiveAll(source, firstLink);
  source = source.replace(
    new RegExp('<ul>', 'g'),
    '<ul className="menu-list">'
  );
  source = source.replace(new RegExp('<p>', 'g'), '<p className="menu-label">');
  source = source.replace(new RegExp('__CURLY_LEFT__', 'g'), '{');
  source = source.replace(new RegExp('__CURLY_RIGHT__', 'g'), '}');

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

function replaceAt(input, search, replace, start) {
  return (
    input.slice(0, start) +
    input.slice(start, start + search.length).replace(search, replace) +
    input.slice(start + search.length)
  );
}

function insertBreaks(source) {
  let preTeg = source.indexOf('<pre>');

  while (preTeg !== -1) {
    let endPreTag = source.indexOf('</pre>', preTeg);
    let newLine = source.indexOf('\n', preTeg);

    do {
      newLine = source.indexOf('\n', preTeg);
      endPreTag = source.indexOf('</pre>', preTeg);
      source = replaceAt(source, '\n', '<br />', newLine);
    } while (
      newLine < endPreTag &&
      newLine !== source.indexOf('\n', preTeg) &&
      newLine !== -1
    );

    preTeg = source.indexOf('<pre>', endPreTag);
  }

  return source;
}

const regexIndexOf = function(string, regex, startpos) {
  const indexOf = string.substring(startpos || 0).search(regex);
  return indexOf >= 0 ? indexOf + (startpos || 0) : indexOf;
};

const replaceIdLinks = source => {
  let isTag = /<a href="#(?!\/)[\S]+/;
  let linkOnPage = regexIndexOf(source, isTag);

  while (linkOnPage !== -1) {
    source = replaceAt(source, '<a href="#', '<Link to="#', linkOnPage);
    source = replaceAt(
      source,
      '</a>',
      '</Link>',
      source.indexOf('</a>', linkOnPage)
    );
    linkOnPage = regexIndexOf(source, isTag, linkOnPage);
  }

  isTag = /<a className="fas fa-hashtag headerLink" href="#(?!\/)[\S]+/;
  linkOnPage = regexIndexOf(source, isTag);
  console.log(linkOnPage);
  while (linkOnPage !== -1) {
    source = replaceAt(
      source,
      '<a className="fas fa-hashtag headerLink" href="#',
      '<Link className="fas fa-hashtag headerLink" to="#',
      linkOnPage
    );
    source = replaceAt(
      source,
      '</a>',
      '</Link>',
      source.indexOf('</a>', linkOnPage)
    );
    linkOnPage = regexIndexOf(source, isTag, linkOnPage);
  }

  return source;
};

export function sanitizeJSX(source) {
  if (source.includes('<pre>')) {
    source = insertBreaks(source);
  }

  // Some of the curlies need to stay to pass props to the plugin component
  source = source.replace(new RegExp('!{', 'g'), '__CURLY_LEFT__');
  source = source.replace(new RegExp('!}', 'g'), '__CURLY_RIGHT__');

  // Don't break the JSX
  // source = source.replace(new RegExp('`', 'g'), '\\`');
  source = source.replace(new RegExp('{', 'g'), '&#123;');
  source = source.replace(new RegExp('}', 'g'), '&#125;');

  // Need to escape br for jsx
  source = source.replace(new RegExp('<br>', 'g'), '<br/>');

  source = source.replace(new RegExp('__CURLY_LEFT__', 'g'), '{');
  source = source.replace(new RegExp('__CURLY_RIGHT__', 'g'), '}');

  // Uppercase to use as react component
  source = source.replace(new RegExp('pluginprovider', 'g'), 'PluginProvider');

  // React uses className
  source = source.replace(new RegExp('class=', 'g'), 'className=');
  source = replaceIdLinks(source, /<a href="#(?!\/)[\S]+/);

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

  source = sanitizeJSX(
    source.replace(
      new RegExp('highlighted-line', 'g'),
      'highlighted-line hero is-primary'
    )
  );

  return `
    import React from 'react';
    import { registerMarkdown } from 'ignite';
    import { Link } from 'react-router-dom';

    const PluginProvider = ({plugins, name, options, children}) => {
      let Plugin = plugins[name];
    
      if (!Plugin) {
        return <div />;
      }

      Plugin = Plugin.component;

      return <Plugin options={options.options} children={children} {...options.properties} />;
    };

    const markDownPage = props => (
      <div className={props.className}>
        <section>
          ${source}
        </section>
      </div>
    );
    
    export default registerMarkdown('${pathToMarkdown}', markDownPage);
  `;
}

import path from 'path';
import dayjs from 'dayjs';
import cheerio from 'cheerio';
import { getOptions } from 'loader-utils';

export function replaceAt(input, search, replace, start) {
  return (
    input.slice(0, start) +
    input.slice(start, start + search.length).replace(search, replace) +
    input.slice(start + search.length)
  );
}

export function insertBreaks(source) {
  let preTeg = source.indexOf('<pre>');

  while (preTeg !== -1) {
    let endPreTag = source.indexOf('</pre>', preTeg);
    let newLine = source.indexOf('\n', preTeg);

    do {
      newLine = source.indexOf('\n', preTeg);
      endPreTag = source.indexOf('</pre>', preTeg);
      source = replaceAt(source, '\n', '<br />', newLine);
    } while (
      source.indexOf('\n', preTeg) < endPreTag &&
      newLine !== source.indexOf('\n', preTeg) &&
      newLine !== -1
    );

    preTeg = source.indexOf('<pre>', endPreTag);
  }

  return source;
}

export const regexIndexOf = function(string, regex, startpos) {
  const indexOf = string.substring(startpos || 0).search(regex);
  return indexOf >= 0 ? indexOf + (startpos || 0) : indexOf;
};

export const replaceIdLinks = source => {
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

  // Use Bulma Checkboxes
  source = source.replace(
    new RegExp('<div class="checkbox', 'g'),
    '<div class="field'
  );
  source = source.replace(
    new RegExp('<label for="checkbox', 'g'),
    '<label htmlFor="field'
  );
  source = source.replace(
    new RegExp('<input type="checkbox"', 'g'),
    '<input type="checkbox" readOnly class="is-checkradio"'
  );

  source = source.replace(
    new RegExp('<a href="http', 'g'),
    '<a target="_blank" href="http'
  );

  // React uses className
  source = source.replace(new RegExp('class=', 'g'), 'className=');
  source = replaceIdLinks(source, /<a href="#(?!\/)[\S]+/);

  return source;
}

export function getLink(source, index = 0) {
  const linkIndex = source.indexOf('<a h', index);

  if (linkIndex === -1) {
    return '';
  }

  const hrefIndex = source.indexOf('href="', linkIndex);
  const startIndex = source.indexOf('/', hrefIndex) + 1;
  const endIndex = source.indexOf('"', startIndex);

  return source.substring(startIndex, endIndex);
}

export function addActive(source, link, firstLink, indexFile) {
  source = source.replace(
    new RegExp('<a h'),
    `<a
      className=!{
        '/${link}' === props.currentPage ||
        ('${firstLink}' === '${link}' && '/' === props.currentPage) ||
        ('${firstLink}' === '${link}' && props.currentPage && props.currentPage.includes('${indexFile}')) 
          ? 'is-active'
          : null
      !}
      h`
  );

  return source;
}

export function addActiveAll(source, firstLink, indexFile) {
  let nextLink = getLink(source);

  while (nextLink !== '') {
    source = addActive(source, nextLink, firstLink, indexFile);
    nextLink = getLink(source);
  }

  return source;
}

export function blogPost(source, pathToMarkdown, options) {
  const date = options.blogPosts.find(post => post.path === pathToMarkdown)
    .birth;
  const card = `
    <div class="card">
      <div class="card-content">
        <div class="blogBody">
          
        </div>
      </div>
    </div>    
  `;
  const libHTMLOptions = {
    xmlMode: true
  };
  const $source = cheerio.load(`<div>${source}</div>`, libHTMLOptions);
  const $fullPage = cheerio.load(card, libHTMLOptions);
  const $stub = cheerio.load(card, libHTMLOptions);
  const heroUrl = $source('#background-image')
    .remove()
    .text();

  $source('.blogSubtitle').append(
    `<span> on ${dayjs(date).format('MMMM D, YYYY')}<span/>`
  );
  $stub('.card-content').prepend($source('.media').clone());
  $fullPage('.card-content').prepend($source('.media').clone());
  $source('.media').remove();

  $source('div')
    .clone()
    .children()
    .map((i, el) =>
      $stub('.blogBody').append(
        i < 3
          ? el
          : i === 4 &&
            `
        <div class='has-text-centered learnMore'>
          <a href='#/${pathToMarkdown}'>
            Read More
          </a>
        </div>
      `
      )
    );

  $fullPage('.blogBody').append($source.html());

  source = $fullPage.html();
  source = sanitizeJSX(source);

  return `
    import React from 'react';
    import makeClass from 'classnames';
    import { Link } from 'react-router-dom';

    const PluginProvider = ({plugins, name, options, children}) => {
      let Plugin = plugins[name];
      const pluginOptions = Plugin.options;
    
      if (!Plugin) {
        return <div />;
      }

      Plugin = Plugin.component;
      return <Plugin {...pluginOptions}  children={children} {...options} />;
    };

    class blogPost extends React.Component {
      componentDidMount() {
        if (!this.props.atIndex) {
          window.configuration.setBlogHero('${heroUrl.trim()}');
        }
      }

      render() {
        return  (
          <div className={makeClass('blogPost', this.props.className)}>
            <p>{this.props.heroUrl}</p>
            <section>
              {this.props.stub ? ${sanitizeJSX($stub.html())} : ${source}}
            </section>
          </div>
        );
      }
    }

    export default blogPost;
  `;
}

export function index(source, pathToMarkdown, options) {
  const firstLink = getLink(source);

  source = addActiveAll(source, firstLink, options.index);
  // Some of the curlies need to stay to pass props to the plugin component
  source = sanitizeJSX(source);
  source = source.replace(
    new RegExp('<ul>', 'g'),
    '<ul className="menu-list">'
  );
  source = source.replace(new RegExp('<p>', 'g'), '<p className="menu-label">');

  return `
    import makeClass from 'classnames';

    export default function markDownPage(props) {
      return (
        <aside className={makeClass('menu', props.className)} onClick={props.onClick}>
          ${source}
        </aside>
      );
    }

    window.configuration.setFirstLink('${pathToMarkdown}', '${firstLink}');
  `;
}

export function markDownPage(source) {
  source = sanitizeJSX(
    source.replace(
      new RegExp('highlighted-line', 'g'),
      'highlighted-line hero is-primary'
    )
  );

  return `
    import React from 'react';
    import { Link } from 'react-router-dom';
    import Gist from 'react-gist';
    import TweetEmbed from 'react-tweet-embed'

    const PluginProvider = ({plugins, name, options, children}) => {
      let Plugin = plugins[name];
      const pluginOptions = Plugin.options;
    
      if (!Plugin) {
        return <div />;
      }

      Plugin = Plugin.component;
      return <Plugin {...pluginOptions}  children={children} {...options} />;
    };

    const markDownPage = props => (
      <div className={props.className}>
        <section>
          ${source}
        </section>
      </div>
    );

    export default markDownPage;
  `;
}

export function detectIndex(resourcePath, pathToMarkdown, options) {
  return (
    resourcePath.includes(options.index) &&
    (!options.navItems ||
      Object.values(options.navItems)
        .map(item => {
          return item === '/' ? options.index : path.join(item, options.index);
        })
        .includes(pathToMarkdown))
  );
}

export default function(source) {
  const options = getOptions(this);
  const pathToMarkdown = path.relative(options.src, this.resourcePath);
  const isIndex = detectIndex(this.resourcePath, pathToMarkdown, options);
  const isBlogPost = this.resourcePath.includes('blog/');

  if (isBlogPost) {
    return blogPost(source, pathToMarkdown, options);
  }

  if (isIndex) {
    return index(source, pathToMarkdown, options);
  }

  return markDownPage(source);
}

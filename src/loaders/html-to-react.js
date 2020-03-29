import path from 'path';
import dayjs from 'dayjs';
import cheerio from 'cheerio';
import { getOptions } from 'loader-utils';
import probe from 'probe-image-size';

import printError from '../utils/print-error';
import replaceAt from '../utils/replace-at';
import trimChar from '../utils/trim-char';

const libHTMLOptions = {
  xmlMode: true
};

export function insertBreaks(source) {
  let preTeg = source.indexOf('<pre');

  while (preTeg !== -1) {
    let endPreTag = source.indexOf('</pre>', preTeg);
    let newLine = source.indexOf('\n', preTeg);

    while (newLine < endPreTag && newLine !== -1) {
      endPreTag = source.indexOf('</pre>', preTeg);
      source = replaceAt(source, '\n', '<br />', newLine);
      newLine = source.indexOf('\n', preTeg);
    }

    preTeg = source.indexOf('<pre', endPreTag);
  }

  return source;
}

export const regexIndexOf = function(string, regex, startpos) {
  const indexOf = string.substring(startpos || 0).search(regex);
  return indexOf >= 0 ? indexOf + (startpos || 0) : indexOf;
};

const replaceAll = (source, regex, search = {}, replace = {}) => {
  let indexOnPage = regexIndexOf(source, regex);

  while (indexOnPage !== -1) {
    source = replaceAt(source, search.start, replace.start, indexOnPage);

    if (search.end && source.indexOf(search.end, indexOnPage) > -1) {
      const nextTag = source.indexOf('<', indexOnPage + 1);
      const close = source.indexOf('/', indexOnPage);

      if (close > nextTag) {
        source = replaceAt(
          source,
          search.end,
          replace.end,
          source.indexOf(search.end, indexOnPage)
        );
      }
    }

    indexOnPage = regexIndexOf(source, regex, indexOnPage);
  }

  return source;
};

export const replaceIdLinks = source => {
  source = replaceAll(
    source,
    /<a href="#(?!\/)[\S]+/,
    {
      start: '<a href="#',
      end: '</a>'
    },
    {
      start:
        '<Link currentPage={(this && this.props || props).currentPage} to="#',
      end: '</Link>'
    }
  );
  source = replaceAll(
    source,
    /<a className="fas fa-hashtag headerLink" href="#(?!\/)[\S]+/,
    {
      start: '<a className="fas fa-hashtag headerLink" href="#',
      end: '</a>'
    },
    {
      start:
        '<Link currentPage={(this && this.props || props).currentPage} className="fas fa-hashtag headerLink" to="#',
      end: '</Link>'
    }
  );

  return source;
};

export function sanitizeJSX(source) {
  if (source.includes('<pre')) {
    source = insertBreaks(source);
  }

  // Some of the curlies need to stay to pass props to the plugin component
  source = source.replace(new RegExp('!{', 'g'), '__CURLY_LEFT__');
  source = source.replace(new RegExp('!}', 'g'), '__CURLY_RIGHT__');

  // Don't break the JSX
  source = source.replace(/__BACK_TICK__/g, '&#96;');
  source = source.replace(new RegExp('`', 'g'), '\\`');
  source = source.replace(new RegExp('{', 'g'), '&#123;');
  source = source.replace(new RegExp('}', 'g'), '&#125;');

  // Need to escape br for jsx
  source = source.replace(new RegExp('<br>', 'g'), '<br/>');

  source = source.replace(new RegExp('__CURLY_LEFT__', 'g'), '{');
  source = source.replace(new RegExp('__CURLY_RIGHT__', 'g'), '}');

  // Uppercase to use as react component
  source = source.replace(new RegExp('pluginprovider', 'g'), 'PluginProvider');
  source = source.replace(new RegExp('details', 'g'), 'Details');

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

  source = source.replace(
    new RegExp('highlighted-line', 'g'),
    'highlighted-line hero is-primary'
  );

  source = source.replace(
    new RegExp('<a target="_blank" href', 'g'),
    '<Link currentPage={(this && this.props || props).currentPage} target="_blank" to'
  );
  source = source.replace(
    new RegExp('<a href', 'g'),
    '<Link currentPage={(this && this.props || props).currentPage} to'
  );
  source = source.replace(
    new RegExp('<a ', 'g'),
    '<Link currentPage={(this && this.props || props).currentPage} '
  );
  source = source.replace(new RegExp('href', 'g'), 'to');
  source = source.replace(
    new RegExp('<a>', 'g'),
    '<Link currentPage={(this && this.props || props).currentPage} to="">'
  );
  source = source.replace(new RegExp('</a>', 'g'), '</Link>');

  // React uses className
  source = source.replace(new RegExp('class=', 'g'), 'className=');
  source = replaceIdLinks(source, /<a href="#(?!\/)[\S]+/);

  source = source.replace(new RegExp('img', 'g'), 'LazyImageComponent');

  return source;
}

export function getLink(source, index = 0) {
  const linkIndex = source.indexOf('<a h', index);

  if (linkIndex === -1) {
    return { index: -1, link: '' };
  }

  const hrefIndex = source.indexOf('href="', linkIndex);
  const endIndex = source.indexOf('"', hrefIndex + 6);
  const startIndex = source.indexOf('/', hrefIndex) + 1;

  return {
    link:
      source.substring(linkIndex, linkIndex + 10) === '<a href=""' ||
      startIndex > endIndex
        ? ''
        : source.substring(startIndex, endIndex),
    index: linkIndex
  };
}

export function addActive(source, link, firstLink, indexFile, options) {
  indexFile = indexFile.replace('.md', '.html');
  source = source.replace(
    new RegExp('<a h'),
    // prettier-ignore
    `<a className=!{
        '/${link}' === props.currentPage ||
        props.currentPage.includes('#') && '/${link}' === props.currentPage.split('#')[0] ||
        ('${firstLink.link}' === '${link}' && ('${options.baseURL}' === props.currentPage ||
        '/${indexFile}' === props.currentPage)) ||
        ('${firstLink.link}' === '${link}' && props.currentPage && (props.currentPage.includes('${indexFile}') ||
        !props.currentPage.includes('.html'))) 
          ? 'is-active'
          : null
      !}
      h`
  );

  return source;
}

export function addActiveAll(source, firstLink, indexFile, options) {
  let { link, index } = getLink(source);

  while (index !== -1) {
    source = addActive(source, link, firstLink, indexFile, options);
    ({ link, index } = getLink(source, index + 1));
  }

  return source;
}

export function codeTabs(source) {
  const codeTabsComponents = [];
  let start = source.indexOf('<CodeTabs>');
  let index = 0;

  while (start !== -1) {
    const endString = '</CodeTabs>';
    let end = source.indexOf(endString, start);
    let html = source.substring(start, end + endString.length);
    html = html.replace('CodeTabs', 'div className="codeTabs"');
    html = html.replace('CodeTabs', 'div');

    codeTabsComponents.push(`
      class CodeTabs${index} extends React.Component {
        state = {
          tabIndex: 0
        }

        onClick = tabIndex => () => {
          this.setState({
            tabIndex
          })
        }

        render() {
          return (
            ${sanitizeJSX(html)}
          )
        }
      }
    `);

    source =
      source.slice(0, start) +
      `<CodeTabs${index} />` +
      source.slice(end + endString.length);
    end = source.indexOf(`<CodeTabs${index} />`, start);
    start = source.indexOf('<CodeTabs>', end);
    index += 1;
  }

  return {
    source,
    codeTabsComponent: codeTabsComponents.join('\n')
  };
}

function getSources(markup) {
  const srcRegex = /src="([\S]+)"/g;
  const sources = [];

  let match = srcRegex.exec(markup);

  while (match) {
    sources.push(match[1]);
    match = srcRegex.exec(markup);
  }

  return sources;
}

export const loadImages = rawSource => {
  return getSources(rawSource).map(async src => {
    if (src.includes('//')) {
      const rawSrc = src;

      if (!src.includes('http')) {
        src = 'http:' + src;
      }

      let dimensions;

      try {
        dimensions = await probe(src);
      } catch (error) {
        printError(`Couldn't resolve image: ${src}`);
        printError(error);

        dimensions = {};
      }

      return new Promise(resolve => {
        resolve(
          `'${rawSrc}': () => Promise.resolve({
              default: {
                src: { src: '${src}' },
                preSrc: '${src}',
                height: ${dimensions.height},
                width: ${dimensions.width}
              }
            })`
        );
      });
    }

    return `
      '${src}': () => import(
        /* webpackChunkName: "image-${path.basename(src)}" */
        '${src.replace('images', './images')}'
      )
    `;
  });
};

// prettier-ignore
const createLink = (pathToMarkdown, options) =>`
  import PropTypes from 'prop-types';

  const getLocation = Location => ({
    href: Location.href,
    pathname: Location.pathname,
    hash: Location.hash,
    search: Location.search
  });

  const Link = props => {
    let {to, ...rest} = props;

    if (to.includes('http')) {
      return <a {...props} href={to} />
    }

    if (to[0] === '#') {
      to = path.join('${options.baseURL}','${pathToMarkdown.replace('.md', '.html')}') + to;
    }

    return (
      <a
        {...rest}
        href={to}
        onClick={e => {
          e.preventDefault();

          if (props.to === '#') {
            return false;
          }

          const location = new URL(path.join(window.location.origin, to))

          window.history.pushState(getLocation(location), null, to);
          props.onClick();

          const popStateEvent = new CustomEvent('changeLocation', { detail: location });
          dispatchEvent(popStateEvent);

          return false;
        }}
      />
    );
  };

  Link.defaultProps = {
    href: '',
    onClick: () => {}
  };

  Link.propTypes = {
    href: PropTypes.string,
    onClick: PropTypes.func
  }
`;

const createPluginProvider = () => `
  const PluginProvider = ({plugins, name, options, children, ...props}) => {
    let Plugin = plugins[name];
    const pluginOptions = Plugin.options;

    if (!Plugin) {
      return <div />;
    }

    Plugin = Plugin.component;
    return (
      <Plugin
        {...pluginOptions} 
        options={options ? options.options : {}}
        {...(options ? options.props : props)}
        children={children}
        plugins={plugins}
      />
    );
  };
`;

const createDetailsComponent = () => `
  class Details extends Component {
    state = {
      open: this.props.open
    }

    render() {
      return (
        <details open={this.state.open}>
          {this.props.children}
        </details>
      )
    }
  };
`;

const createImageRenderer = async rawSource => {
  const imageSources = await Promise.all(loadImages(rawSource));
  return `
    import IdealImage from 'react-ideal-image';

    const imageSources = { ${imageSources.join(',')} };

    class LazyImageComponent extends React.Component {
      state = {
        image: null,
        ImageProvider: imageSources[this.props.src]
      }

      componentDidMount() {
        if (!this.state.image) {
          this.state.ImageProvider().then(c => {
            this.setState({
              image: c.default
            });
          });
        }
      }

      render() {
        let { image } = this.state;

        return image && typeof image === 'object' ? (
          <IdealImage
            {...this.props}
            className={makeClass('image', this.props.className)}
            src={image.src.src}
            width={image.src.width || image.width}
            height={image.src.height || image.height}
            placeholder={{ lqip: image.preSrc }}
            srcSet={image.src.images
              ? image.src.images.map(i => ({
                  ...i,
                  src: i.path
                }))
              : [{
                  src: image.src,
                  width: image.width
                }]
            }
          />
        ) : <img className={makeClass('image', this.props.className)} src={image} />;
      }
    }
  `;
};

const createLazyComponent = () => `
  const lazyComponent = provider =>
    class extends React.Component {
      static defaultProps = {
        shouldLoad: true
      };
  
      state = {
        Comp: null
      };
  
      componentDidMount() {
        if (!this.state.Comp && this.props.shouldLoad) {
          provider().then(c => {
            this.setState({
              Comp: c.default
            });
          });
        }
      }
  
      render() {
        const { Comp } = this.state;
        return Comp ? React.createElement(Comp, this.props, this.props.children || null) : null;
      }
    };
`;

export const initPage = async (rawSource, pathToMarkdown, options) => {
  const { codeTabsComponent, source } = codeTabs(rawSource);
  const imageRenderer = await createImageRenderer(rawSource);

  return {
    pageStart: `
      import path from 'path';
      import React, { Component } from 'react';
      import makeClass from 'classnames';

      ${createLink(pathToMarkdown, options)}
      ${createPluginProvider()}
      ${createDetailsComponent()}
      ${codeTabsComponent}
      ${imageRenderer}
      ${createLazyComponent()}

      const Gist = lazyComponent(() => import(/* webpackChunkName: "plugin-embed" */ 'react-gist'))
      const TweetEmbed = lazyComponent(() => import(/* webpackChunkName: "plugin-embed" */ 'react-tweet-embed'))
    `,
    source
  };
};

export const createStubAndPost = (source, pathToMarkdown, options) => {
  const date = options.blogPosts
    ? (options.blogPosts.find(post => post.path === pathToMarkdown) || {}).birth
    : '';
  const card = `
    <div class="card">
      <div class="card-content">
        <div class="blogBody">
          
        </div>
      </div>
    </div>    
  `;
  const $source = cheerio.load(`<div>${source}</div>`, libHTMLOptions);
  const $fullPage = cheerio.load(card, libHTMLOptions);
  const $stub = cheerio.load(card, libHTMLOptions);
  const heroUrl = $source('#background-image')
    .remove()
    .text();

  if (date) {
    $source('.blogSubtitle').append(
      `<span> on ${dayjs(date).format('MMMM D, YYYY')}<span/>`
    );
  }

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
        <Link to='${path.join(
          options.baseURL,
          pathToMarkdown.replace('.md', '.html')
        )}'>
          Read More
        </Link>
      </div>
    `
      )
    );

  $fullPage('.blogBody').append($source.html());

  return {
    heroUrl,
    stub: $stub.html(),
    post: $fullPage.html()
  };
};

export function blogPost(source, pathToMarkdown, options) {
  let { heroUrl, stub, post } = createStubAndPost(
    source,
    pathToMarkdown,
    options
  );

  post = sanitizeJSX(post);
  stub = sanitizeJSX(stub);

  return `
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
              {this.props.stub ? ${stub} : ${post}}
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

  source = addActiveAll(source, firstLink, options.index, options);
  source = sanitizeJSX(source);
  source = source.replace(
    new RegExp('<ul>', 'g'),
    '<ul className="menu-list">'
  );
  source = source.replace(new RegExp('<p>', 'g'), '<p className="menu-label">');

  return `
    export default function index(props) {
      return (
        <aside className={makeClass('menu', props.className)} onClick={props.onClick}>
          ${source}
        </aside>
      );
    }

    window.configuration.setFirstLink('${
      options.watch
        ? path.join('/', pathToMarkdown)
        : path.join(options.baseURL, pathToMarkdown)
    }', '${path.join('/', firstLink.link.replace('.html', '.md'))}');
  `;
}

export function markDownPage(source) {
  source = sanitizeJSX(source);

  return `
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

export function homePage(source) {
  if (source.includes('<!-- no-hero -->')) {
    source = source.replace('<!-- no-hero -->', '');
  } else {
    const $source = cheerio.load(
      `<div class="source">${source}</div>`,
      libHTMLOptions
    );
    const $homePage = cheerio.load(
      `<div class="homePage"></div>`,
      libHTMLOptions
    );

    const contentRow = `
      <div class="hero">
        <div class="hero-body">
          <div class="columns">
            <div class="home column content is-two-thirds-tablet is-three-quarters-desktop">
            </div>
          </div>
        </div>
      </div>
    `;
    let $currentRow = cheerio.load(contentRow, libHTMLOptions);

    while ($source('.source > :first-child').length > 0) {
      const isHero = $source('.source > :first-child').hasClass('hero');
      const $element = $source.html('.source > :first-child');
      $source('.source > :first-child').remove();

      if (isHero) {
        if ($currentRow && $currentRow('.home.column').children().length > 0) {
          $homePage('.homePage').append($currentRow.html());
        }

        $currentRow = cheerio.load(contentRow, libHTMLOptions);
        $homePage('.homePage').append($element);
      } else {
        $currentRow('.home.column').append($element);
      }
    }

    source = $homePage.html();
  }

  return `
    const homePage = props => (
      <div>
        ${sanitizeJSX(source)}
      </div>
    );

    export default homePage;
  `;
}

export function detectIndex(resourcePath, pathToMarkdown, options) {
  return (
    resourcePath.includes(options.index) &&
    (!options.navItems ||
      Object.values(options.navItems)
        .map(item => {
          return item === '/'
            ? options.index
            : path.join(trimChar(item, '/'), options.index);
        })
        .includes(trimChar(path.join(options.baseURL, pathToMarkdown), '/')))
  );
}

export const determinePage = async (
  rawSource,
  resourcePath,
  pathToMarkdown,
  options
) => {
  try {
    let { pageStart, source } = await initPage(
      rawSource,
      pathToMarkdown,
      options
    );

    if (pathToMarkdown === 'home.md') {
      source = homePage(source);
    } else if (resourcePath.includes(path.join(options.src, 'blog/'))) {
      source = blogPost(source, pathToMarkdown, options);
    } else if (detectIndex(resourcePath, pathToMarkdown, options)) {
      source = index(source, pathToMarkdown, options);
    } else {
      source = markDownPage(source);
    }

    return `
      ${pageStart}
      ${source}
    `;
  } catch (error) {
    printError(`Problem transforming ${pathToMarkdown}`);
    printError(error);
  }
};

export default function(rawSource) {
  const options = getOptions(this);
  const pathToMarkdown = path.relative(options.src, this.resourcePath);
  return determinePage(rawSource, this.resourcePath, pathToMarkdown, options);
}

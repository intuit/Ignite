import path from 'path';
import { parseScript } from 'esprima';
import types from 'ast-types';
import escodegen from 'escodegen';

const { builders } = types;

const functionsToString = obj => {
  const isArray = Array.isArray(obj);
  let stringOptions = isArray ? '[' : '{';

  Object.entries(obj).forEach(([key, val]) => {
    if (typeof val === 'function') {
      val = val.toString();
    } else if (typeof val === 'object') {
      val = functionsToString(val);
    } else {
      val = `"${val}"`;
    }

    stringOptions += isArray ? `${val},` : `"${key}": ${val},`;
  });

  stringOptions += isArray ? ']' : '}';

  return stringOptions;
};

export const stringify = code => {
  try {
    const options = functionsToString(code);
    const ast = parseScript(`var options = ${options}`).body;
    const program = builders.program(ast);

    return escodegen.generate(program);
  } catch (error) {
    throw new Error('Error parsing options.', error);
  }
};

const registerMarkdown = (entries, options) => {
  return entries
    .map(
      pathToMarkdown => `
        registerMarkdown(
          '${path.relative(options.src, pathToMarkdown)}',
          () => import(/* webpackChunkName: "${path.basename(
            pathToMarkdown,
            '.md'
          )}" */ '${pathToMarkdown}')
        );
      `
    )
    .join('\n');
};

const generatePlugins = plugins => {
  return plugins
    .map(([name, path, options]) => {
      let [defaultImport, es6Imports = ''] = name.split('{');
      defaultImport = defaultImport.replace(',', '').trim();

      if (defaultImport !== '') {
        defaultImport = `
          registerPlugin(
            '${defaultImport}',
            () => import(/* webpackChunkName: "plugin-${defaultImport}" */ '${path}'),
            options
          );
        `;
      }

      es6Imports = es6Imports
        .replace('}', '')
        .split(',')
        .filter(str => str !== '')
        .map(
          importName => `
            registerPlugin(
              '${importName.trim()}',
              () => import(/* webpackChunkName: "plugin-${importName.trim()}" */ '${path}').then((res) => ({
                default: res['${importName.trim()}']
              })),
              options
            );
          `
        )
        .join('\n');

      return `
        ${options ? stringify(options) : 'var options = {}'}

        ${defaultImport}

        ${es6Imports}
      `;
    })
    .join('\n');
};

const findBirthday = (posts, file) => {
  const post = posts.find(post => post.path === file);
  return post ? post.birth : '';
};

const generateBlogIndex = (blogFiles, options) => {
  const blogPosts = blogFiles
    .map(blogFile => path.relative(options.src, blogFile))
    .sort(
      (a, b) =>
        findBirthday(options.blogPosts, a) < findBirthday(options.blogPosts, b)
    );

  return `
    import Waypoint from 'react-waypoint';

    class blogIndex extends React.Component {
      constructor(props) {
        super(props)

        this.showMore = this.showMore.bind(this)
        this.scrollTop = this.scrollTop.bind(this)
        this.toggleScrollTopButton = this.toggleScrollTopButton.bind(this)
        this.state = {
          shownPosts: 10,
          showScrollButton: false,
        };
      }

      componentDidMount() {
        window.configuration.setBlogHero(null);
      }

      scrollTop() {
        document.querySelector('body').scrollIntoView({
          behavior: 'smooth'
        });
      }

      toggleScrollTopButton(isVisible) {
        this.setState({
          showScrollButton: isVisible
        });
      }

      showMore() {
        this.setState({
          shownPosts: this.state.shownPosts + 10
        });
      }

      render() {
        return e('div', { className: 'blogIndex' }, [
          e(Waypoint, { key: 'Waypoint', onLeave: () => this.toggleScrollTopButton(true), onEnter: () => this.toggleScrollTopButton(false) }, e('div')),
          ${JSON.stringify(
            blogPosts
          )}.slice(0, this.state.shownPosts).map((blogFile, index) => {
            const BlogPost = window.configuration.markdown.find(page => page[0] === '${
              options.baseURL
            }' + \`$\{blogFile}\`)[1]
            return e(BlogPost, { stub: true, atIndex: true, key: blogFile });
          }),
          ${
            blogPosts.length
          } > this.state.shownPosts && e('div', { className: 'showMore' }, e('button', { className: 'button', onClick: this.showMore, key: 'showMore' } , 'Load More')),
          this.state.showScrollButton && e('div', { className: 'backToTop notification is-info', onClick: this.scrollTop, key: 'scrollButton' }, [
            e('i', { className: 'fas fa-angle-up', key: 'uparrow' }),
            e('span', { className: 'notification is-light', key: 'toTop', style: { paddingRight: '1.5rem', borderBottomLeftRadius: 0, borderTopLeftRadius: 0, boxShadow: 'none', border: 'none' } }, 'Back to Top')
          ])
        ]);
      }
    }

    registerMarkdown('blog/${options.index}', async () => ({ 
      default: blogIndex
    }));
  `;
};

const initLazyLoad = options => {
  return `
    window.configuration = {
      searchIndex: [],
      markdown: [],
      plugins: [],
      setFirstLink() {
        console.log('Called setFirstLink before it was configured');
      },
      setSearchIndex() {
        console.log('Called setSearchIndex before it was configured');
      }
    };

    import React from 'react';
    import path from 'path';

    const e = React.createElement;

    function lazyLoad(CompProvider) {
      return class extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            Comp: null
          }
        }

        componentDidMount() {
          if (!this.state.Comp) {
            CompProvider().then(c => {
              this.setState({
                Comp: c.default
              });
            });
          }
        }

        render() {
          const { Comp } = this.state;
          return Comp ? React.createElement(Comp, this.props, null) : null;
        }
      }
    }

    const INDEX_PAGE = '${options.index}';

    function trim(s, c) {
      if (c === "]") c = "\\\\]";
      if (c === "\\\\") c = "\\\\\\\\";
      return s.replace(new RegExp(
        "^[" + c + "]+|[" + c + "]+$", "g"
      ), "");
    }

    function isIndex(p) {
      return p.includes(INDEX_PAGE) && 
        (!process.env.navItems || 
          Object.values(process.env.navItems)
            .map(item => {
              return item === '/' ? INDEX_PAGE : path.join(trim(item, '/'), INDEX_PAGE);
            })
            .includes(p)
          );
    }

    function registerMarkdown(markdownPath, provider) {
      const comp = lazyLoad(provider);

      if(isIndex(markdownPath)) {
        window.configuration.markdown.push([path.join('${
          options.baseURL
        }', markdownPath), comp, true, null]);
      } else {
        window.configuration.markdown.push([path.join('${
          options.baseURL
        }', markdownPath), comp]);
      }
    }

    function registerPlugin(name, provider, options) {
      const comp = lazyLoad(provider);

      window.configuration.plugins.push([
        name,
        lazyLoad(provider),
        options
      ]);
    }
  `;
};

const buildSearchIndex = (dir = __dirname) => {
  return `
    import(/* webpackChunkName: "search-files" */ '${dir}/search').then((files) => {
      window.configuration.setSearchIndex(files.default);
    })
  `;
};

export default function generate(entries = [], plugins = [], options = {}) {
  return () => {
    let generated = initLazyLoad(options);
    const blogFiles = entries.filter(page =>
      page.includes(path.join(options.src, 'blog/'))
    );

    generated += buildSearchIndex(options.dir);
    generated += registerMarkdown(entries, options);

    if (plugins.length > 0) {
      generated += generatePlugins(plugins);
    }

    if (blogFiles.length > 0 && options.blogPosts) {
      generated += generateBlogIndex(blogFiles, options);
    }

    return generated;
  };
}

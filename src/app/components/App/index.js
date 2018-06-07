import path from 'path';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import makeClass from 'classnames';
import ReactRouterPropTypes from 'react-router-prop-types';
import scrollToElement from 'scroll-to-element';

import SearchResult from '../SearchResult';
import BlogHero from '../BlogHero';
import Header from '../Header';
import { default as Sidebar } from '../Sidebar';
import styles from './app.css';

export const determineComponents = (
  markdown,
  location,
  indexFile,
  navItems = process.env.navItems
) => {
  const filePath = location.pathname.replace('.html', '.md');
  const isBlog = filePath.includes('blog/');
  const index = path.join(process.env.baseURL, indexFile);

  let Page = markdown[filePath];
  let SidebarComponent = markdown[index];

  if (navItems && !filePath.includes('blog/')) {
    const parent =
      markdown.indexFiles &&
      Object.entries(markdown.indexFiles).find(([key]) => {
        return (
          Object.values(navItems).includes(path.dirname(key)) &&
          path.dirname(key) === path.dirname(filePath)
        );
      });

    if (parent) {
      SidebarComponent = markdown[parent[0]];

      if (!Page || filePath.includes(indexFile)) {
        Page = markdown[parent[1]];
      }
    }

    if (!Page && !SidebarComponent && markdown.indexFiles) {
      const rootIndex =
        navItems.root === process.env.baseURL
          ? indexFile
          : path.join(navItems.root, indexFile);
      SidebarComponent = markdown[rootIndex];
      Page = markdown[markdown.indexFiles[rootIndex]];
    }
  }

  if (
    !isBlog &&
    markdown.indexFiles &&
    filePath === path.join(process.env.baseURL, indexFile)
  ) {
    Page = markdown[markdown.indexFiles[filePath]];
  }

  if (!Page && markdown.indexFiles) {
    Page = markdown[markdown.indexFiles[index]];
  }

  if (!Page) {
    Page = () => null;
  }

  return {
    SidebarComponent,
    Page
  };
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: []
    };
  }

  componentDidUpdate() {
    this.jumpToHash();
  }

  jumpToHash = () => {
    setImmediate(() => {
      const { hash } = this.props.location;
      if (hash && document.querySelector(hash)) {
        scrollToElement(hash, {
          duration: 500
        });
      } else if (!hash) {
        scrollToElement('body', {
          duration: 1
        });
      }
    });
  };

  setSearchResults = searchResults => {
    this.setState({
      searchResults
    });
  };

  render() {
    const { markdown, location, index } = this.props;
    const isBlog = location.pathname.includes('blog/');
    const isHome =
      location.pathname === path.join(process.env.baseURL, '/home.html');
    const { SidebarComponent, Page } = determineComponents(
      markdown,
      location,
      index
    );

    let content;

    if (this.state.searchResults.length > 0) {
      content = (
        <div className={makeClass(styles.searchResults)}>
          {this.state.searchResults.map(([fileName, results]) => (
            <SearchResult
              key={fileName}
              setResults={searchResults => this.setState({ searchResults })}
              fileName={fileName}
              results={results}
            />
          ))}
        </div>
      );
    } else if (isHome) {
      content = <Page plugins={this.props.plugins} className={styles.Page} />;
    } else if (isBlog) {
      content = (
        <div>
          <BlogHero key="hero" {...this.props} />
          <div className={makeClass(styles.App, 'columns', styles.blog)}>
            <div
              className={makeClass(
                'column',
                'content',
                'is-two-thirds-tablet',
                'is-three-quarters-desktop'
              )}
            >
              <Page plugins={this.props.plugins} className={styles.Page} />
            </div>
          </div>
        </div>
      );
    } else {
      content = (
        <div id="root" className={makeClass(styles.contentArea)}>
          <div className={makeClass(styles.App, 'columns')}>
            <Sidebar
              className="column is-one-third-tablet is-one-quarter-desktop box"
              content={SidebarComponent}
              currentPage={`${location.pathname}${
                location.hash ? location.hash : ''
              }`}
            />

            <div
              className={makeClass(
                !styles.content,
                'column',
                'content',
                'is-two-thirds-tablet',
                'is-three-quarters-desktop'
              )}
            >
              <Page plugins={this.props.plugins} className={styles.Page} />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.root}>
        <Header
          location={this.props.location}
          setSearchResults={this.setSearchResults}
        />

        {content}
      </div>
    );
  }
}

App.propTypes = {
  markdown: PropTypes.object.isRequired,
  // eslint-disable-next-line react/no-typos
  location: ReactRouterPropTypes.location.isRequired,
  plugins: PropTypes.array,
  index: PropTypes.string,
  blogHero: PropTypes.string
};

App.defaultProps = {
  plugins: [],
  blogHero: null,
  index: process.env.index
};

export default App;

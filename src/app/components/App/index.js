import path from 'path';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import scrollToElement from 'scroll-to-element';

import trimChar from '../../../utils/trim-char';
import DocsPage from '../DocsPage';
import SearchResults from '../SearchResults';
import BlogPage from '../BlogPage';
import Header from '../Header';
import styles from './app.css';

const getParent = (markdown, navItems, filePath) =>
  markdown.indexFiles &&
  Object.entries(markdown.indexFiles).find(([key]) => {
    const currentDir = filePath.includes('.md')
      ? path.dirname(filePath)
      : filePath;

    return (
      Object.values(navItems).includes(path.dirname(key)) &&
      trimChar(path.dirname(key), '/') === trimChar(currentDir, '/')
    );
  });

export const determineSidebar = (
  markdown,
  location,
  indexFile,
  navItems = process.env.navItems
) => {
  const filePath = location.pathname.replace('.html', '.md');
  const index = path.join(process.env.baseURL, indexFile);

  let SidebarComponent = markdown[index];
  let currentFirstPage = markdown.indexFiles[index];

  if (navItems) {
    const [parentIndex, parentPageFirstPage] =
      getParent(markdown, navItems, filePath) || [];

    if (parentIndex && parentPageFirstPage) {
      SidebarComponent = markdown[parentIndex];
      currentFirstPage = parentPageFirstPage;
    }

    if (!SidebarComponent && markdown.indexFiles) {
      const rootIndex = path.join(navItems.root, indexFile);
      SidebarComponent = markdown[rootIndex];
      currentFirstPage = markdown.indexFiles[rootIndex];
    }
  }

  window.configuration.currentFirstPage = currentFirstPage;

  return SidebarComponent;
};

export const determinePage = (
  markdown,
  location,
  indexFile,
  navItems = process.env.navItems
) => {
  const filePath = location.pathname.replace('.html', '.md');

  if (filePath.includes('blog/')) {
    return markdown[filePath];
  }

  let Page = markdown[filePath];

  if (navItems) {
    const [, parentPageFirstPage] =
      getParent(markdown, navItems, filePath) || [];

    if (parentPageFirstPage && (!Page || filePath.includes(indexFile))) {
      Page = markdown[parentPageFirstPage];
    }

    if (!Page && markdown.indexFiles) {
      const rootIndex = path.join(navItems.root, indexFile);
      Page = markdown[markdown.indexFiles[rootIndex]];
    }
  }

  const index = path.join(process.env.baseURL, indexFile);

  if ((!Page || index === filePath) && markdown.indexFiles) {
    Page = markdown[markdown.indexFiles[index]];
  }

  return Page ? Page : () => null;
};

class App extends Component {
  state = {
    searchResults: []
  };

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
    const Page = determinePage(markdown, location, index);

    return (
      <div className={styles.root}>
        <Header
          location={this.props.location}
          setSearchResults={this.setSearchResults}
        />

        {this.state.searchResults.length > 0 ? (
          <SearchResults searchResults={this.state.searchResults} />
        ) : isHome ? (
          <Page plugins={this.props.plugins} className={styles.Page} />
        ) : isBlog ? (
          <BlogPage
            className={styles.App}
            Page={Page}
            plugins={this.props.plugins}
            location={location}
            blogHero={this.props.blogHero}
          />
        ) : (
          <DocsPage
            className={styles.App}
            SidebarComponent={determineSidebar(markdown, location, index)}
            Page={Page}
            location={location}
            plugins={this.props.plugins}
          />
        )}
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

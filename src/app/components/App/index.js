import path from 'path';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import DocsPage from '../DocsPage';
import SearchResults from '../SearchResults';
import BlogPage from '../BlogPage';
import Header from '../Header';
import styles from './app.css';
import { determinePage, determineSidebar } from './determine-components';

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
        document.querySelector(hash).scrollIntoView({
          behavior: 'smooth'
        });
      } else if (!hash) {
        document.querySelector('body').scrollIntoView();
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
          searchIndex={this.props.searchIndex}
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

import React, { Component } from 'react';
import path from 'path';
import PropTypes from 'prop-types';
import makeClass from 'classnames';
import ReactRouterPropTypes from 'react-router-prop-types';
import scrollToElement from 'scroll-to-element';

import Header from '../Header';
import Footer from '../Footer';
import Sidebar from '../Sidebar';
import styles from './app.css';

class App extends Component {
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
        scrollToElement('#root', {
          duration: 1
        });
      }
    });
  };

  render() {
    const { markdown, location } = this.props;
    const filePath = location.pathname.substring(1);

    let Page = markdown[filePath];
    let sidebarComponent = markdown.docRootIndexFile;

    const parent =
      markdown.indexFiles &&
      Object.entries(markdown.indexFiles).find(
        ([key, val]) => path.dirname(key) === path.dirname(filePath)
      );

    if (parent) {
      sidebarComponent = markdown[parent[0]];
    }

    if (filePath.includes('index.md') && markdown.indexFiles) {
      const index = markdown.indexFiles[filePath];
      Page = markdown[index];
      sidebarComponent = markdown[filePath];
    }

    if (!Page && markdown.firstPagePath && markdown[markdown.firstPagePath]) {
      Page = markdown[markdown.firstPagePath];
    } else if (!Page) {
      Page = markdown.docRootIndexFile;
    }

    return (
      <div className={styles.root}>
        <Header items={this.props.navItems} />

        <div id="root" className={makeClass('container', styles.contentArea)}>
          <div className={makeClass(styles.App, 'columns')}>
            <Sidebar
              className="column is-one-third-tablet is-one-quarter-desktop"
              content={sidebarComponent}
              currentPage={`${location.pathname}${
                location.hash ? location.hash : ''
              }`}
            />

            <Page
              className={makeClass(
                styles.contentWidth,
                'column',
                'content',
                'is-two-thirds-tablet',
                'is-three-quarters-desktop'
              )}
              plugins={this.props.plugins}
            />
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  markdown: PropTypes.object.isRequired,
  // eslint-disable-next-line react/no-typos
  location: ReactRouterPropTypes.location.isRequired,
  plugins: PropTypes.array
};

App.defaultProps = {
  plugins: []
};

export default App;

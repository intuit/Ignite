import React, { Component } from 'react';
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
        scrollToElement('h1', {
          duration: 0
        });
      }
    });
  };

  render() {
    const { markdown, location } = this.props;
    const filePath = location.pathname.substring(1);

    let Page = markdown[filePath];

    if (!Page && markdown.firstPagePath && markdown[markdown.firstPagePath]) {
      Page = markdown[markdown.firstPagePath];
    } else if (!Page) {
      Page = markdown.docRootIndexFile;
    }

    return (
      <div className={styles.root}>
        <Header />

        <div className={makeClass('container')}>
          <div className={makeClass(styles.App, 'columns')}>
            <Sidebar
              className="column is-one-quarter"
              content={markdown.docRootIndexFile}
              currentPage={`${location.pathname}${
                location.hash ? location.hash : ''
              }`}
            />
            <Page className={makeClass('column', 'content')} />
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
  location: ReactRouterPropTypes.location.isRequired
};

export default App;

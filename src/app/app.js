import React from 'react';
import PropTypes from 'prop-types';
import makeClass from 'classnames';
import ReactRouterPropTypes from 'react-router-prop-types';

import Header from './header';
import Footer from './footer';
import Sidebar from './Sidebar';
import styles from './app.css';

const App = props => {
  const filePath = props.location.pathname.substring(1);
  let Page = props.markdown[filePath];

  if (!Page && props.markdown.firstPagePath) {
    Page =
      props.markdown[props.markdown.firstPagePath] ||
      props.markdown.docRootIndexFile;
  } else if (!Page) {
    Page = props.markdown.docRootIndexFile;
  }

  return (
    <div className={styles.root}>
      <Header />

      <div className={makeClass(styles.App, 'container')}>
        <div className="row">
          <Sidebar
            className={makeClass('col', 'col-lg-2')}
            content={props.markdown.docRootIndexFile}
          />
          <Page className={makeClass('col', 'col-lg-10')} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

App.propTypes = {
  markdown: PropTypes.object.isRequired,
  // eslint-disable-next-line react/no-typos
  location: ReactRouterPropTypes.location.isRequired
};

export default App;

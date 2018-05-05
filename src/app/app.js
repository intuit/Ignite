import React from 'react';
import PropTypes from 'prop-types';
import makeClass from 'classnames';
import ReactRouterPropTypes from 'react-router-prop-types';

import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import styles from './index.css';

const App = props => {
  const filePath = props.location.pathname.substring(1);
  let Page = props.markdown[filePath];

  if (!Page) {
    Page = props.markdown.docRootIndexFile;
  }

  return (
    <div>
      <Header />

      <div className="container">
        <div className={makeClass(styles.App, 'row')}>
          <Sidebar className={makeClass('col', 'col-lg-3')} />
          <Page className={makeClass('col', 'col-lg-9')} />
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

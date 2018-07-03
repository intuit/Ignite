import React from 'react';
import PropTypes from 'prop-types';
import makeClass from 'classnames';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Link } from 'react-router-dom';

import { default as Sidebar } from '../Sidebar';
import styles from './docs-page.css';

const DocsPage = ({ Page, SidebarComponent, location, plugins, className }) => (
  <div id="root" className={makeClass(styles.contentArea)}>
    <div className={makeClass(className, 'columns')}>
      <Sidebar
        className="column is-one-third-tablet is-one-quarter-desktop box"
        content={SidebarComponent}
        currentPage={`${location.pathname}${
          location.hash ? location.hash : ''
        }`}
      />

      <div
        className={makeClass(
          styles.content,
          'column',
          'content',
          'is-two-thirds-tablet',
          'is-three-quarters-desktop'
        )}
      >
        <Page plugins={plugins} className={styles.Page} />
      </div>
    </div>
  </div>
);

DocsPage.propTypes = {
  Page: PropTypes.node.isRequired,
  SidebarComponent: PropTypes.node.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  plugins: PropTypes.array,
  className: PropTypes.string
};

DocsPage.defaultProps = {
  plugins: [],
  className: null
};

export default DocsPage;

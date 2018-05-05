import React from 'react';
import makeClass from 'classnames';
import PropTypes from 'prop-types';

import styles from './sidebar.css';

const Sidebar = props => (
  <div
    className={makeClass(
      'sidebar',
      'sidebar-left',
      styles.root,
      props.className
    )}
  >
    {props.content && <props.content className={styles.sidebar} />}
  </div>
);

Sidebar.propTypes = {
  className: PropTypes.string,
  content: PropTypes.func
};

Sidebar.defaultProps = {
  className: null,
  content: null
};

export default Sidebar;

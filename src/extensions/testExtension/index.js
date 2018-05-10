import React from 'react';
import PropTypes from 'prop-types';
import styles from './test.css';

const myPlugin = props => (
  <div className={styles.unicorn}>
    <h1>This is pretty awesome.</h1>
    {props.children}
  </div>
);

myPlugin.propTypes = {
  children: PropTypes.node
};

myPlugin.defaultProps = {
  children: null
};

export default myPlugin;

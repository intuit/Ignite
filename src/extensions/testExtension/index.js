import React from 'react';
import PropTypes from 'prop-types';
import makePlugin from '../ignite-plugin';

import styles from './test.css';

const TestExtension = props => {
  return (
    <div>
      <h1 className={styles.header}> What a useful plugin I am! </h1>
      {props.children}
    </div>
  );
};

TestExtension.propTypes = {
  children: PropTypes.node
};

TestExtension.defaultProps = {
  children: null
};

export const extension = {
  name: 'test',
  component: TestExtension
};

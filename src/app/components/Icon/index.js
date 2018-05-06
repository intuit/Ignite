import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ type, icon }) => <i className={`${type} fa-${icon}`} />;

Icon.propTypes = {
  type: PropTypes.string,
  icon: PropTypes.string
};

Icon.defaultProps = {
  type: 'far',
  icon: 'question-circle'
};

export default Icon;

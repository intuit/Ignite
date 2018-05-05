import React from 'react';
import makeClass from 'classnames';
import PropTypes from 'prop-types';

const Sidebar = props => (
  <div className={makeClass('sidebar', 'sidebar-left', props.className)}>
    {props.content && <props.content />}
  </div>
);

Sidebar.propTypes = {
  className: PropTypes.string
};

Sidebar.defaultProps = {
  className: null
};

export default Sidebar;

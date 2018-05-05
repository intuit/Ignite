import React from 'react';
import makeClass from 'classnames';
import PropTypes from 'prop-types';

const Sidebar = props => (
  <div className={makeClass('sidebar', 'sidebar-left', props.className)}>
    <h3 className="sidebar-category">Components</h3>
    <ul className="sidebar-links">
      <li>
        <a href="#">Alerts</a>
      </li>
      <li>
        <a href="#">Breadcrumbs</a>
      </li>
      <li>
        <a className="active" href="#">
          Cards
        </a>
      </li>
      <li>
        <a href="#">Footer</a>
      </li>
      <li>
        <a href="#">Header</a>
      </li>
      <li>
        <a href="#">Menu</a>
      </li>
      <li>
        <a href="#">Modal</a>
      </li>
      <li>
        <a href="#">Navigation</a>
      </li>
      <li>
        <a href="#">Pagination</a>
      </li>
      <li>
        <a href="#">Panels</a>
      </li>
      <li>
        <a href="#">Progress Bars</a>
      </li>
      <li>
        <a href="#">Sidebar</a>
      </li>
      <li>
        <a href="#">Steppers</a>
      </li>
      <li>
        <a href="#">Tabs</a>
      </li>
      <li>
        <a href="#">Tags</a>
      </li>
      <li>
        <a href="#">Tooltips</a>
      </li>
    </ul>
  </div>
);

Sidebar.propTypes = {
  className: PropTypes.string
};

Sidebar.defaultProps = {
  className: null
};

export default Sidebar;

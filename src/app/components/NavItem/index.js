import React from 'react';
import PropTypes from 'prop-types';
import makeClass from 'classnames';
import ReactRouterPropTypes from 'react-router-prop-types';

import Link from '../Router/link';

const getIndex = (index = process.env.index) => index.replace('.md', '.html');

const makeRouterLink = link => {
  const index = getIndex();

  if (link === '/') {
    return index;
  }

  if (!link.includes(index)) {
    return `${link}/${index}`;
  }

  return link;
};

const NavItem = ({ item: [key, item], ...props }) => {
  let isActive;

  if (props.navItems) {
    const otherPaths = Object.values(props.navItems).filter(val => val !== '/');

    if (
      (item !== '/' && props.location.pathname.includes(item)) ||
      (props.location.pathname === '/' && props.navItems.root === item) ||
      (item === '/' &&
        !otherPaths.find(path => props.location.pathname.includes(path)) &&
        !props.location.pathname.includes('blog/'))
    ) {
      isActive = true;
    }
  }

  return (
    key !== 'root' && (
      <Link
        key={key}
        onClick={props.onClick}
        className={makeClass('navbar-item', isActive && 'is-active')}
        to={makeRouterLink(item)}
      >
        {key}
        {props.icon}
      </Link>
    )
  );
};

NavItem.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
  navItems: PropTypes.object,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  item: PropTypes.array.isRequired
};

NavItem.defaultProps = {
  navItems: process.env.navItems,
  icon: null,
  onClick: () => {}
};

export default NavItem;

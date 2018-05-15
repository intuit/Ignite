import React from 'react';
import { Link } from 'react-router-dom';
import makeClass from 'classnames';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import styles from './header.css';

const makeRouterLink = link => {
  if (!link.includes('index.md')) {
    return `#/${link}/index.md`;
  }

  return `#/${link}`;
};

const Header = props => (
  <nav
    className={makeClass('navbar')}
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        {props.logo && (
          <img
            src={props.logo}
            alt="logo"
            className={makeClass(styles.logo, 'navbar-item')}
          />
        )}
        <a href="/" className={makeClass(styles.title, 'navbar-item')}>
          {props.title}
        </a>
      </div>

      {props.items &&
        Object.entries(props.items).map(([key, item]) => (
          <a key={key} className="navbar-item" href={makeRouterLink(item)}>
            {key}
          </a>
        ))}

      <div className="navbar-end">
        <a className="navbar-item" href={props.githubURL}>
          GitHub
          <Icon className={styles.githubIcon} type="fab" icon="github" />
        </a>
      </div>
    </div>
  </nav>
);

Header.propTypes = {
  title: PropTypes.string,
  logo: PropTypes.string,
  githubURL: PropTypes.string,
  items: PropTypes.object
};

Header.defaultProps = {
  title: process.env.title,
  logo: process.env.logo,
  githubURL: process.env.githubURL,
  items: process.env.navItems
};

export default Header;

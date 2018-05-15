import React from 'react';
import makeClass from 'classnames';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import Icon from '../Icon';
import styles from './header.css';

const makeRouterLink = link => {
  if (!link.includes(process.env.index)) {
    return `#/${link}/${process.env.index}`;
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

      <div className="navbar-end">
        {process.env.navItems &&
          Object.entries(process.env.navItems).map(([key, item]) => {
            let isActive;

            if (
              props.location.pathname.includes(item) ||
              (props.location.pathname === '/' &&
                process.env.navItems.root === item)
            ) {
              isActive = true;
            }

            return (
              key !== 'root' && (
                <a
                  key={key}
                  className={makeClass('navbar-item', isActive && 'is-active')}
                  href={makeRouterLink(item)}
                >
                  {key}
                </a>
              )
            );
          })}
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
  // eslint-disable-next-line react/no-typos
  location: ReactRouterPropTypes.location.isRequired
};

Header.defaultProps = {
  title: process.env.title,
  logo: process.env.logo,
  githubURL: process.env.githubURL
};

export default Header;

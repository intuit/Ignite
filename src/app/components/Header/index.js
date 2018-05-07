import React from 'react';
import makeClass from 'classnames';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import styles from './header.css';

const Header = props => (
  <nav
    className={makeClass(styles.nav, 'navbar')}
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

      <div className={makeClass(styles.github, 'navbar-end')}>
        <a className="navbar-item" href={props.githubURL}>
          GitHub
        </a>
        <Icon type="fab" icon="github" />
      </div>
    </div>
  </nav>
);

Header.propTypes = {
  title: PropTypes.string,
  logo: PropTypes.string,
  githubURL: PropTypes.string
};

Header.defaultProps = {
  title: process.env.title,
  logo: process.env.logo,
  githubURL: process.env.githubURL
};

export default Header;

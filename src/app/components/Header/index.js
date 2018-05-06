import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import styles from './header.css';

const Header = props => (
  <nav className={styles.nav}>
    <div className="nav-container">
      <div className="nav-logo">
        {props.logo && (
          <img src={props.logo} alt="logo" className={styles.logo} />
        )}
        <a href="/">{props.title}</a>
      </div>
      {props.githubURL && (
        <ul className="nav-links">
          <li className={styles.github}>
            <a href={props.githubURL}>GitHub</a>
            <Icon type="fab" icon="github" />
          </li>
        </ul>
      )}
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

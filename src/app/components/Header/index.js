import React from 'react';
import PropTypes from 'prop-types';

const Header = props => (
  <nav>
    <div className="nav-container">
      <div className="nav-logo">
        <a href="/">{props.title}</a>
      </div>
      {props.githubURL && (
        <ul className="nav-links">
          <li>
            <a href={props.githubURL}>GitHub</a>
          </li>
        </ul>
      )}
    </div>
  </nav>
);

Header.propTypes = {
  title: PropTypes.string,
  githubURL: PropTypes.string
};

Header.defaultProps = {
  title: process.env.title,
  githubURL: process.env.githubURL
};

export default Header;

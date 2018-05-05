import React from 'react';

const Header = () => (
  <nav>
    <div className="nav-container">
      <div className="nav-logo">
        <a href="/">{process.env.title}</a>
      </div>
      {process.env.githubURL && (
        <ul className="nav-links">
          <li>
            <a href={process.env.githubURL}>GitHub</a>
          </li>
        </ul>
      )}
    </div>
  </nav>
);

export default Header;

import React from 'react';

const Header = () => (
  <nav>
    <div className="nav-container">
      <div className="nav-logo">
        <a href="/">{process.env.title}</a>
      </div>
      <ul className="nav-links">
        <li>
          <a href="https://github.intuit.com/Fuego/Ignite">GitHub</a>
        </li>
      </ul>
    </div>
  </nav>
);

export default Header;

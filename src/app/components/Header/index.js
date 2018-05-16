import React, { Component } from 'react';
import makeClass from 'classnames';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import Icon from '../Icon';
import styles from './header.css';

const makeRouterLink = link => {
  if (link === '/') {
    return `#/${process.env.index}`;
  }

  if (!link.includes(process.env.index)) {
    return `#/${link}/${process.env.index}`;
  }

  return `#/${link}`;
};

class Header extends Component {
  state = {
    menuOpen: false
  };

  onClickHamburger = () => {
    const { menuOpen } = this.state;

    this.setState({
      menuOpen: !menuOpen
    });
  };

  render() {
    return (
      <nav
        className={makeClass('navbar')}
        role="navigation"
        aria-label="main navigation"
      >
        <div className={styles.container}>
          <div className="navbar-brand">
            <a href="/" className={makeClass(styles.title, 'navbar-item')}>
              {this.props.logo && (
                <img
                  src={this.props.logo}
                  alt="logo"
                  className={makeClass(styles.logo, 'navbar-item')}
                />
              )}
              <span className="is-hidden-mobile">{this.props.title}</span>
            </a>

            <a
              role="button"
              className={makeClass(
                'navbar-burger',
                this.state.menuOpen && 'is-active'
              )}
              aria-label="menu"
              aria-expanded="false"
              onClick={this.onClickHamburger}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </a>
          </div>

          <div
            className={makeClass(
              'navbar-menu',
              this.state.menuOpen && 'is-active'
            )}
          >
            <div className="navbar-end">
              {process.env.navItems &&
                Object.entries(process.env.navItems).map(([key, item]) => {
                  const otherPaths = Object.values(process.env.navItems).filter(
                    val => val !== '/'
                  );

                  let isActive;

                  if (
                    (item !== '/' &&
                      this.props.location.pathname.includes(item)) ||
                    (this.props.location.pathname === '/' &&
                      process.env.navItems.root === item) ||
                    (item === '/' &&
                      !otherPaths.find(path =>
                        this.props.location.pathname.includes(path)
                      ))
                  ) {
                    isActive = true;
                  }

                  return (
                    key !== 'root' && (
                      <a
                        key={key}
                        className={makeClass(
                          'navbar-item',
                          isActive && 'is-active'
                        )}
                        href={makeRouterLink(item)}
                      >
                        {key}
                      </a>
                    )
                  );
                })}
              <a className="navbar-item" href={this.props.githubURL}>
                GitHub
                <Icon className={styles.githubIcon} type="fab" icon="github" />
              </a>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

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

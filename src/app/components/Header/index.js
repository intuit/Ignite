import React, { Component } from 'react';
import makeClass from 'classnames';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import Search from '../Search';
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

const NavItem = ({ item: [key, item], ...props }) => {
  const otherPaths = Object.values(props.navItems).filter(val => val !== '/');

  let isActive;

  if (
    (item !== '/' && props.location.pathname.includes(item)) ||
    (props.location.pathname === '/' && props.navItems.root === item) ||
    (item === '/' &&
      !otherPaths.find(path => props.location.pathname.includes(path)) &&
      !props.location.pathname.includes('blog/'))
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
};

const GithubLink = ({ githubURL }) =>
  githubURL ? (
    <a className="navbar-item" href={githubURL} target="_blank">
      GitHub
      <Icon className={styles.icon} type="fab" icon="github" />
    </a>
  ) : null;

const hasBlogLink = () =>
  Object.values(window.configuration.markdown).find(([page]) =>
    page.includes('blog/')
  );

const BlogLink = ({ className }) =>
  hasBlogLink() ? (
    <a className={makeClass('navbar-item', className)} href="#/blog/index.md">
      Blog
      <Icon className={styles.icon} type="fas" icon="rss" />
    </a>
  ) : null;

BlogLink.propTypes = {
  className: PropTypes.string
};

BlogLink.defaultProps = {
  className: null
};

const DocsLink = ({ className }) => (
  <a className={makeClass('navbar-item', className)} href="#/index.md">
    Docs
    <Icon className={styles.icon} type="fas" icon="book" />
  </a>
);

DocsLink.propTypes = {
  className: PropTypes.string
};

DocsLink.defaultProps = {
  className: null
};

GithubLink.propTypes = {
  githubURL: PropTypes.string
};

GithubLink.defaultProps = {
  githubURL: null
};

class Header extends Component {
  state = {
    menuOpen: false
  };

  closeMenu = () => {
    this.setState({
      menuOpen: false
    });
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
        className={makeClass('navbar', styles.nav)}
        role="navigation"
        aria-label="main navigation"
      >
        <div className={styles.container}>
          <div className="navbar-brand">
            <a href="#/" className={makeClass(styles.title, 'navbar-item')}>
              {this.props.logo && (
                <img
                  src={this.props.logo}
                  alt="logo"
                  className={makeClass(styles.logo, 'navbar-item')}
                />
              )}
              <span
                className={makeClass(
                  'is-hidden-mobile navbar-item',
                  styles.titleText
                )}
              >
                {this.props.title}
              </span>
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
            <div className="navbar-end" onClick={this.closeMenu}>
              <Search setSearchResults={this.props.setSearchResults} />
              {this.props.navItems ? (
                Object.entries(this.props.navItems).map(item => (
                  <NavItem key={item[0]} item={item} {...this.props} />
                ))
              ) : (
                <DocsLink
                  className={
                    !this.props.location.pathname.includes('blog/') &&
                    !(
                      this.props.location.pathname === '/' &&
                      !window.configuration.markdown['home.md']
                    ) &&
                    'is-active'
                  }
                />
              )}

              <BlogLink
                className={
                  this.props.location.pathname.includes('blog/') && 'is-active'
                }
              />
              <GithubLink githubURL={this.props.githubURL} />
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
  navItems: PropTypes.array,
  setSearchResults: PropTypes.func,
  // eslint-disable-next-line react/no-typos
  location: ReactRouterPropTypes.location
};

Header.defaultProps = {
  setSearchResults: () => {},
  title: process.env.title,
  logo: process.env.logo,
  navItems: process.env.navItems,
  githubURL: process.env.githubURL,
  location: {
    pathname: '',
    hash: ''
  }
};

export default Header;

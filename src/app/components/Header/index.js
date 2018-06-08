import path from 'path';
import React, { Component } from 'react';
import makeClass from 'classnames';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Link } from 'react-router-dom';

import NavItem from '../NavItem';
import Search from '../Search';
import Icon from '../Icon';
import styles from './header.css';

const getIndex = (index = process.env.index) => index.replace('.md', '.html');

const linkProps = {
  className: PropTypes.string,
  onClick: PropTypes.func
};

const defaultLinkProps = {
  className: null,
  onClick: () => {}
};

const GithubLink = ({ githubURL, onClick }) =>
  githubURL ? (
    <a
      onClick={onClick}
      className="navbar-item"
      href={githubURL}
      rel="noopener noreferrer"
      target="_blank"
    >
      GitHub
      <Icon className={styles.icon} type="fab" icon="github" />
    </a>
  ) : null;

GithubLink.propTypes = {
  ...linkProps,
  githubURL: PropTypes.string
};

GithubLink.defaultProps = {
  ...defaultLinkProps,
  githubURL: null
};

const hasBlogLink = () =>
  Object.values(window.configuration.markdown).find(([page]) =>
    page.includes('blog/')
  );

const BlogLink = ({ className, onClick }) =>
  hasBlogLink() ? (
    <NavItem
      location={location}
      className={className}
      onClick={onClick}
      item={['Blog', path.join(process.env.baseURL, '/blog/index.html')]}
      icon={<Icon className={styles.icon} type="fas" icon="rss" />}
    />
  ) : null;

BlogLink.propTypes = linkProps;
BlogLink.defaultProps = defaultLinkProps;

const DocsLink = ({ className, onClick }) => (
  <NavItem
    location={location}
    className={className}
    onClick={onClick}
    item={['Docs', path.join(process.env.baseURL, getIndex())]}
    icon={<Icon className={styles.icon} type="fas" icon="book" />}
  />
);

DocsLink.propTypes = linkProps;
DocsLink.defaultProps = defaultLinkProps;

class Header extends Component {
  state = {
    menuOpen: false
  };

  closeMenu = () => {
    this.setState({
      menuOpen: false
    });
    this.props.setSearchResults({});
  };

  onClickHamburger = () => {
    const { menuOpen } = this.state;

    this.setState({
      menuOpen: !menuOpen
    });
  };

  render() {
    const hasHomePage = window.configuration.markdown.find(
      ([key]) => key === path.join(process.env.baseURL, 'home.md')
    );

    return (
      <nav
        className={makeClass('navbar', styles.nav)}
        role="navigation"
        aria-label="main navigation"
      >
        <div className={styles.container}>
          <div className="navbar-brand">
            <Link
              onClick={this.closeMenu}
              to={path.join(
                process.env.baseURL,
                hasHomePage ? '/home.html' : '/'
              )}
              className={makeClass(styles.title, 'navbar-item')}
            >
              {this.props.logo && (
                <img
                  src={`${
                    this.props.logo.includes('http')
                      ? this.props.logo
                      : `./${this.props.logo}`
                  }`}
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
            </Link>

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
              <Search
                setSearchResults={this.props.setSearchResults}
                endSearch={this.closeMenu}
              />
              {this.props.navItems ? (
                Object.entries(this.props.navItems).map(item => (
                  <NavItem key={item[0]} item={item} {...this.props} />
                ))
              ) : (
                <DocsLink
                  onClick={this.closeMenu}
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
                onClick={this.closeMenu}
                className={
                  this.props.location.pathname.includes('blog/') && 'is-active'
                }
              />
              <GithubLink
                onClick={this.closeMenu}
                githubURL={this.props.githubURL}
              />
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

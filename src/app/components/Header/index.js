import path from 'path';
import React, { Component } from 'react';
import makeClass from 'classnames';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import Link from '../Router/link';

import NavItem from '../NavItem';
import Search from '../Search';
import Icon from '../Icon';
import styles from './header.css';

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
      className="navbar-item"
      href={githubURL}
      rel="noopener noreferrer"
      target="_blank"
      onClick={onClick}
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
      item={['Blog', path.join(process.env.baseURL, '/blog')]}
      icon={<Icon className={styles.icon} type="fas" icon="rss" />}
      onClick={onClick}
    />
  ) : null;

BlogLink.propTypes = linkProps;
BlogLink.defaultProps = defaultLinkProps;

const DocsLink = ({ className, onClick }) => (
  <NavItem
    location={location}
    className={className}
    item={['Docs', process.env.baseURL]}
    icon={<Icon className={styles.icon} type="fas" icon="book" />}
    onClick={onClick}
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
      ([key]) => key === path.join(process.env.baseURL, 'home')
    );
    return (
      <nav
        className={makeClass('main-nav navbar', styles.nav)}
        role="navigation"
        aria-label="main navigation"
      >
        <div className={makeClass('container', styles.container)}>
          <div className="navbar-brand">
            <Link
              to={path.join(process.env.baseURL, hasHomePage ? '/home' : '/')}
              className={makeClass(styles.title, 'navbar-item')}
              onClick={this.closeMenu}
            >
              {this.props.logo && (
                <img src={this.props.logo} alt="logo" className={styles.logo} />
              )}
              <h1 className={makeClass('is-hidden-mobile', styles.titleText)}>
                {this.props.title}
              </h1>
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
                searchIndex={this.props.searchIndex}
                setSearchResults={this.props.setSearchResults}
                endSearch={this.closeMenu}
              />
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
                      !window.configuration.markdown[
                        path.join(process.env.baseURL, 'home')
                      ]
                    ) &&
                    'is-active'
                  }
                  onClick={this.closeMenu}
                />
              )}

              <BlogLink
                className={
                  this.props.location.pathname.includes('blog/') && 'is-active'
                }
                onClick={this.closeMenu}
              />
              <GithubLink
                githubURL={this.props.githubURL}
                onClick={this.closeMenu}
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
  searchIndex: PropTypes.array,
  setSearchResults: PropTypes.func,
  location: ReactRouterPropTypes.location
};

Header.defaultProps = {
  setSearchResults: () => {},
  title: process.env.title,
  logo: process.env.logo,
  searchIndex: [],
  navItems: process.env.navItems,
  githubURL: process.env.githubURL,
  location: {
    pathname: '',
    hash: ''
  }
};

export default Header;

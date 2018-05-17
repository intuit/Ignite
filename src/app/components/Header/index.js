import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

const navItem = ([key, item]) => {
  const otherPaths = Object.values(this.props.navItems).filter(
    val => val !== '/'
  );

  let isActive;

  if (
    (item !== '/' && this.props.location.pathname.includes(item)) ||
    (this.props.location.pathname === '/' &&
      this.props.navItems.root === item) ||
    (item === '/' &&
      !otherPaths.find(path => this.props.location.pathname.includes(path)))
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
    <a className="navbar-item" href={githubURL}>
      GitHub
      <Icon className={styles.githubIcon} type="fab" icon="github" />
    </a>
  ) : null;

const hasBlogLink = () =>
  Object.values(window.configuration.markdown).find(([page]) => {
    console.log(page);
    return page.includes('blog/');
  });

const BlogLink = () =>
  hasBlogLink() ? (
    <Link className="navbar-item" to="blog/index.md">
      Blog
      <Icon className={styles.githubIcon} type="fas" icon="rss" />
    </Link>
  ) : null;

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
              <span className={makeClass('is-hidden-mobile', styles.titleText)}>
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
            <div className="navbar-end">
              {this.props.navItems &&
                Object.entries(this.props.navItems).map(navItem)}

              <BlogLink />
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
  // eslint-disable-next-line react/no-typos
  location: ReactRouterPropTypes.location.isRequired
};

Header.defaultProps = {
  title: process.env.title,
  logo: process.env.logo,
  navItems: process.env.navItems,
  githubURL: process.env.githubURL
};

export default Header;

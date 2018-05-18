import path from 'path';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import makeClass from 'classnames';
import ReactRouterPropTypes from 'react-router-prop-types';
import scrollToElement from 'scroll-to-element';

import Header from '../Header';
import { default as Sidebar } from '../Sidebar';
import styles from './app.css';

export const determineComponents = (
  markdown,
  location,
  indexFile,
  navItems = process.env.navItems
) => {
  const filePath = location.pathname.substring(1);

  let Page = markdown[filePath];
  const isBlog = filePath.includes('blog/');
  let SidebarComponent = isBlog ? null : markdown[indexFile];

  if (navItems && !filePath.includes('blog/')) {
    const parent =
      markdown.indexFiles &&
      Object.entries(markdown.indexFiles).find(([key]) => {
        return (
          Object.values(navItems).includes(path.dirname(key)) &&
          path.dirname(key) === path.dirname(filePath)
        );
      });

    if (parent) {
      SidebarComponent = markdown[parent[0]];

      if (!Page || filePath.includes(indexFile)) {
        Page = markdown[parent[1]];
      }
    }

    if (!Page && !SidebarComponent && markdown.indexFiles) {
      const rootIndex =
        navItems.root === '/' ? indexFile : path.join(navItems.root, indexFile);
      SidebarComponent = markdown[rootIndex];
      Page = markdown[markdown.indexFiles[rootIndex]];
    }
  }

  if (!isBlog && markdown.indexFiles && filePath.includes(indexFile)) {
    Page = markdown[markdown.indexFiles[filePath]];
  }

  if (!Page && markdown.indexFiles) {
    Page = markdown[markdown.indexFiles[indexFile]];
  }

  if (!Page) {
    Page = () => null;
  }

  return {
    SidebarComponent,
    Page
  };
};

class App extends Component {
  componentDidUpdate() {
    this.jumpToHash();
  }

  jumpToHash = () => {
    setImmediate(() => {
      const { hash } = this.props.location;
      if (hash && document.querySelector(hash)) {
        scrollToElement(hash, {
          duration: 500
        });
      } else if (!hash) {
        scrollToElement('body', {
          duration: 1
        });
      }
    });
  };

  render() {
    const { markdown, location, index, blogHero } = this.props;
    const isBlogIndex = location.pathname.includes('blog/index.md');
    const isBlog = location.pathname.includes('blog/');
    const { SidebarComponent, Page } = determineComponents(
      markdown,
      location,
      index
    );

    return (
      <div className={styles.root}>
        <Header location={this.props.location} />

        {isBlog && (
          <section
            className={makeClass(
              'hero is-info is-medium is-bold',
              styles.blogHero
            )}
            style={
              blogHero && {
                maxWidth: 1800,
                margin: 'auto',
                background: `url(${blogHero})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
              }
            }
          >
            <div className="hero-body">
              <div className="container has-text-centered">
                <h1 className="title" style={isBlogIndex ? {} : { opacity: 0 }}>
                  Blog
                </h1>
              </div>
            </div>
          </section>
        )}

        <div id="root" className={makeClass(styles.contentArea)}>
          <div
            className={makeClass(styles.App, 'columns', isBlog && styles.blog)}
          >
            <Sidebar
              className="column is-one-third-tablet is-one-quarter-desktop box"
              content={SidebarComponent}
              currentPage={`${location.pathname}${
                location.hash ? location.hash : ''
              }`}
            />

            <div
              className={makeClass(
                !isBlog && styles.content,
                'column',
                'content',
                'is-two-thirds-tablet',
                'is-three-quarters-desktop'
              )}
            >
              <Page plugins={this.props.plugins} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  markdown: PropTypes.object.isRequired,
  // eslint-disable-next-line react/no-typos
  location: ReactRouterPropTypes.location.isRequired,
  plugins: PropTypes.array,
  index: PropTypes.string,
  blogHero: PropTypes.string
};

App.defaultProps = {
  plugins: [],
  blogHero: null,
  index: process.env.index
};

export default App;

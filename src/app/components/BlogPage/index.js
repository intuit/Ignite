import React from 'react';
import PropTypes from 'prop-types';
import makeClass from 'classnames';
import ReactRouterPropTypes from 'react-router-prop-types';

import BlogHero from '../BlogHero';
import styles from './blog-page.css';

const BlogPage = ({ Page, location, plugins, blogHero, className }) => (
  <div>
    <BlogHero key="hero" location={location} blogHero={blogHero} />
    <div className={makeClass(className, 'columns', styles.blog)}>
      <div
        className={makeClass(
          'column',
          'content',
          'is-two-thirds-tablet',
          'is-three-quarters-desktop'
        )}
      >
        <Page plugins={plugins} className={styles.Page} />
      </div>
    </div>
  </div>
);

BlogPage.propTypes = {
  Page: PropTypes.node.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  plugins: PropTypes.array,
  blogHero: PropTypes.string,
  className: PropTypes.string
};

BlogPage.defaultProps = {
  plugins: [],
  blogHero: null,
  className: null
};

export default BlogPage;

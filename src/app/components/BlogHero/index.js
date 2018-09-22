import path from 'path';
import React from 'react';
import PropTypes from 'prop-types';
import makeClass from 'classnames';
import ReactRouterPropTypes from 'react-router-prop-types';

import styles from './blogHero.css';

const BlogHero = ({ location, blogHero, baseURL }) => (
  <section
    className={makeClass('hero is-info is-medium is-bold', styles.blogHero)}
    style={
      blogHero && blogHero !== 'undefined'
        ? {
            maxWidth: 1800,
            margin: 'auto',
            background: `url(${blogHero})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }
        : {}
    }
  >
    <div className="hero-body">
      <div className="container has-text-centered">
        <h1
          className="title"
          style={
            location.pathname === path.join(baseURL, '/blog')
              ? {}
              : { opacity: 0 }
          }
        >
          Blog
        </h1>
      </div>
    </div>
  </section>
);

BlogHero.propTypes = {
  // eslint-disable-next-line react/no-typos
  location: ReactRouterPropTypes.location.isRequired,
  baseURL: PropTypes.string,
  blogHero: PropTypes.string
};

BlogHero.defaultProps = {
  baseURL: process.env.baseURL,

  blogHero: null
};

export default BlogHero;

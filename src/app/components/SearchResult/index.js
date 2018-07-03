/* eslint-disable react/no-danger */

import path from 'path';
import React from 'react';
import PropTypes from 'prop-types';
import makeClass from 'classnames';
import markdown from 'zeedown';
import { Link } from 'react-router-dom';

import styles from './searchResult.css';

const SearchResult = ({ fileName, baseURL, results, setResults }) => (
  <div key={fileName} className="card">
    <div key={fileName} className="card-content">
      <Link
        className={makeClass('subtitle', 'has-text-link', styles.title)}
        to={path.join(baseURL, fileName.replace('.md', '.html'))}
        onClick={() => setTimeout(() => setResults({}), 10)}
      >
        {fileName}
      </Link>

      {[...results].map(result => (
        <div key={result}>
          <p
            dangerouslySetInnerHTML={{
              __html: markdown(result)
            }}
          />
          <br />
        </div>
      ))}
    </div>
  </div>
);

SearchResult.propTypes = {
  setResults: PropTypes.func,
  fileName: PropTypes.string.isRequired,
  baseURL: PropTypes.string,
  results: PropTypes.array
};

SearchResult.defaultProps = {
  setResults: () => {},
  baseURL: process.env.baseURL,
  results: []
};

export default SearchResult;

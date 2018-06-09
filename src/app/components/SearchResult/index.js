/* eslint-disable react/no-danger */

import path from 'path';
import React from 'react';
import PropTypes from 'prop-types';
import makeClass from 'classnames';
import MarkdownIt from 'markdown-it';
import { Link } from '@reach/router';

import styles from './searchResult.css';

const renderer = new MarkdownIt();

const SearchResult = ({ fileName, results, setResults }) => (
  <div key={fileName} className="card">
    <div key={fileName} className="card-content">
      <Link
        className={makeClass('subtitle', 'has-text-link', styles.title)}
        to={path.join(process.env.baseURL, fileName.replace('.md', '.html'))}
        onClick={() => setResults({})}
      >
        {fileName}
      </Link>

      {[...results].map(result => (
        <div key={result}>
          <p
            dangerouslySetInnerHTML={{
              __html: renderer.render(result)
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
  results: PropTypes.array
};

SearchResult.defaultProps = {
  setResults: () => {},
  results: []
};

export default SearchResult;

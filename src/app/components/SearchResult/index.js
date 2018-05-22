/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';
import makeClass from 'classnames';
import MarkdownIt from 'markdown-it';

import styles from './searchResult.css';

const renderer = new MarkdownIt();

const SearchResult = ({ fileName, results, setResults }) => (
  <div key={fileName} className="card">
    <div key={fileName} className="card-content">
      <a
        className={makeClass('subtitle', 'has-text-link', styles.title)}
        href={`#/${fileName}`}
        onClick={() => setResults({})}
      >
        {fileName}
      </a>

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

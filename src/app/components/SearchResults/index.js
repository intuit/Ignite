import React from 'react';
import PropTypes from 'prop-types';
import makeClass from 'classnames';

import SearchResult from '../SearchResult';
import styles from './search-results.css';

const SearchResults = ({ searchResults, setResults }) => (
  <div className={makeClass(styles.searchResults)}>
    {searchResults.map(([fileName, results]) => (
      <SearchResult
        key={fileName}
        setResults={setResults}
        fileName={fileName}
        results={results}
      />
    ))}
  </div>
);

SearchResults.propTypes = {
  setResults: PropTypes.func,
  searchResults: PropTypes.array
};

SearchResults.defaultProps = {
  setResults: () => {},
  searchResults: []
};

export default SearchResults;

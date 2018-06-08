import React from 'react';
import PropTypes from 'prop-types';
import makeClass from 'classnames';

import SearchResult from '../SearchResult';
import styles from './search-results.css';

function SearchResults({ searchResults }) {
  return (
    <div className={makeClass(styles.searchResults)}>
      {searchResults.map(([fileName, results]) => (
        <SearchResult
          key={fileName}
          setResults={searchResults => this.setState({ searchResults })}
          fileName={fileName}
          results={results}
        />
      ))}
    </div>
  );
}

SearchResults.propTypes = {
  searchResults: PropTypes.array
};

SearchResults.defaultProps = {
  searchResults: []
};

export default SearchResults;

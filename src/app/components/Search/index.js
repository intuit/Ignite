import React, { Component } from 'react';
import PropTypes from 'prop-types';
import makeClass from 'classnames';
import throttle from 'throttle-debounce/throttle';
import searchIndex from 'search-index/dist/search-index';
import getLineNumber from 'get-line-from-pos';

import styles from './search.css';

const indexOfAll = (source, term) => {
  const indexes = [];

  let index = source.indexOf(term);

  while (index !== -1) {
    indexes.push(index);
    index = source.indexOf(term, index + 1);
  }

  return indexes;
};

const getLines = (source, indexes, term) => {
  return new Set(
    indexes.map(index => {
      const lineNumber = getLineNumber(source, index);
      const line = source
        .split('\n')
        [lineNumber - 1].replace(new RegExp(` ${term} `, 'g'), ` **${term}** `);

      return line;
    })
  );
};

class Search extends Component {
  static propTypes = {
    indexFiles: PropTypes.bool,
    setSearchResults: PropTypes.func
  };

  static defaultProps = {
    indexFiles: true,
    setSearchResults: () => {}
  };

  constructor(props) {
    super(props);
    if (props.indexFiles) {
      searchIndex({}, (err, si) => {
        if (err) {
          console.log(err);
        }

        this.index = si;
        this.addPages();
      });
    }
  }

  addPages = () => {
    this.index.concurrentAdd({}, window.configuration.searchIndex, err => {
      console.log(err);
    });
  };

  search = throttle(500, term => {
    const results = new Set();

    this.index
      .search({
        query: {
          AND: { '*': [term] }
        }
      })
      .on('data', data => {
        const indexes = indexOfAll(data.document.body, term);
        results.add([data.id, getLines(data.document.body, indexes, term)]);
      })
      .on('end', () => {
        this.props.setSearchResults(results);
      });
  });

  keyDown = event => {
    if (event.keyCode === 13) {
      this.search(event.target.value);
    }

    if (event.keyCode === 8) {
      this.search(event.target.value);
    }
  };

  render() {
    return (
      <div className={makeClass('navbar-item', styles.root)}>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Search"
            onChange={e => this.search(e.target.value)}
            onKeyDown={this.keyDown}
          />
        </div>
      </div>
    );
  }
}

export default Search;

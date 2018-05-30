import React, { Component } from 'react';
import PropTypes from 'prop-types';
import makeClass from 'classnames';
import throttle from 'throttle-debounce/throttle';
import lunr from 'lunr';
import getLineNumber from 'get-line-from-pos';

import styles from './search.css';

const indexOfAll = (source, term) => {
  const indexes = [];

  let index = source.toLowerCase().indexOf(term);

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
      this.index = lunr(function() {
        this.ref('id');
        this.field('body');

        window.configuration.searchIndex.forEach(doc => this.add(doc));
      });
    }
  }

  search = throttle(500, term => {
    const results = this.index.search(`*${term}*`).map(result => {
      const page = window.configuration.searchIndex.find(
        file => file.id === result.ref
      );
      const indexes = indexOfAll(page.body, term);

      return [page.id, getLines(page.body, indexes, term)];
    });
    console.log(results);
    this.props.setSearchResults(results);
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

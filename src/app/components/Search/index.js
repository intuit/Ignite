import React, { Component } from 'react';
import PropTypes from 'prop-types';
import makeClass from 'classnames';
import { throttle } from 'throttle-debounce';
import SearchApi from 'js-worker-search';
import getLineNumber from 'get-line-from-pos';
import replaceAt from '../../../utils/replace-at';

import styles from './search.css';

export const indexOfAll = (source, term) => {
  const indexes = [];

  let index = source.toLowerCase().indexOf(term);

  while (index !== -1) {
    indexes.push(index);
    index = source.indexOf(term, index + 1);
  }

  return indexes;
};

export const lineWithCodeBlock = (line, term) => {
  let tickIndex = line.indexOf('`');
  let termIndex = line.indexOf(term);

  while (termIndex !== -1) {
    if (termIndex < tickIndex || tickIndex === -1) {
      line = replaceAt(line, term, `**${term}**`, termIndex);
      termIndex = line.indexOf(term, termIndex + 3);

      if (tickIndex !== -1) {
        tickIndex += 4; // Account for **
      }
    } else if (line.indexOf('`', tickIndex + 1) < termIndex) {
      const paired = line.indexOf('`', tickIndex + 1);

      if (paired === -1) {
        tickIndex = line.indexOf('`', tickIndex + 1);
      } else {
        tickIndex = line.indexOf('`', paired + 1);
      }
    } else {
      termIndex = line.indexOf(term, termIndex + 1);
    }
  }

  return line;
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getLines = (source, indexes, term) => {
  return new Set(
    indexes.map(index => {
      const lineNumber = getLineNumber(source, index);
      let line = source.split('\n')[lineNumber - 1];

      if (line.indexOf('`') > -1) {
        line = lineWithCodeBlock(line, term);
      } else if (line.indexOf('![') === -1) {
        line = line.replace(new RegExp(`${term}`), `**${term}**`);
        line = line.replace(
          new RegExp(`${capitalizeFirstLetter(term)}`, 'g'),
          `**${capitalizeFirstLetter(term)}**`
        );
      }

      return line;
    })
  );
};

class Search extends Component {
  static propTypes = {
    searchIndex: PropTypes.array,
    setSearchResults: PropTypes.func
  };

  static defaultProps = {
    searchIndex: [],
    setSearchResults: () => {}
  };

  constructor(props) {
    super(props);

    this.index = new SearchApi();
    this.constructIndex();
  }

  constructIndex = () => {
    this.props.searchIndex.forEach(file => {
      this.index.indexDocument(file.id, file.body);
    });
  };

  componentDidUpdate = () => {
    this.constructIndex();
  };

  search = throttle(500, async term => {
    if (term === '') {
      return this.props.setSearchResults([]);
    }

    const results = await this.index.search(term);
    const filteredResults = [];
    results.forEach(result => {
      const page = this.props.searchIndex.find(file => file.id === result);
      const indexes = indexOfAll(page.body, term);
      if (indexes.length !== 0) {
        filteredResults.push([page.id, getLines(page.body, indexes, term)]);
      }
    });

    this.props.setSearchResults(filteredResults);
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

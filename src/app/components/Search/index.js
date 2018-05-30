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

const inCodeBlock = (line, term) => {
  if (line.indexOf('`') === -1) {
    return false;
  }

  const termIndex = line.indexOf(term);
  let tickIndex = line.indexOf('`');
  let inTick = false;

  // console.log(line, tickIndex);
  const ticks = [];

  while (tickIndex !== -1) {
    if (ticks.length > 0) {
      ticks.pop();
    } else {
      ticks.push(true);
    }

    tickIndex = line.indexOf('`', tickIndex + 1);
    // console.log(tickIndex, termIndex, ticks);
    if (tickIndex > termIndex && ticks.length > 0) {
      inTick = true;
    }
  }

  return inTick;
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const getLines = (source, indexes, term) => {
  return new Set(
    indexes.map(index => {
      const lineNumber = getLineNumber(source, index);
      let line = source.split('\n')[lineNumber - 1];
      if (!inCodeBlock(line, term)) {
        line = line.replace(new RegExp(`${term}`, 'g'), `**${term}**`);
        line = line.replace(
          new RegExp(`${capitalizeFirstLetter(term)}`, 'g'),
          `**${capitalizeFirstLetter(term)}**`
        );
        console.log(line);
      }

      return line;
    })
  );
};

class Search extends Component {
  static propTypes = {
    setSearchResults: PropTypes.func
  };

  static defaultProps = {
    setSearchResults: () => {}
  };

  constructor(props) {
    super(props);

    this.index = lunr.Index.load(window.configuration.search.index);
  }

  search = throttle(500, term => {
    if (term === '') {
      return this.props.setSearchResults([]);
    }

    const results = this.index.search(`*${term}*`).map(result => {
      const page = window.configuration.search.files.find(
        file => file.id === result.ref
      );
      const indexes = indexOfAll(page.body, term);

      return [page.id, getLines(page.body, indexes, term)];
    });

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

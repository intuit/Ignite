import React, { Component } from 'react';
import makeClass from 'classnames';
import PropTypes from 'prop-types';

import styles from './test.css';

class TestExtension extends Component {
  state = {
    count: 0
  };

  render() {
    const { count } = this.state;
    const { children } = this.props;

    return (
      <div>
        <h1 className={styles.header}> What a useful plugin I am! </h1>
        {children}

        <h2>Count</h2>
        <p>{this.state.count}</p>
        <button
          className="button is-success"
          type="button"
          onClick={() => this.setState({ count: count - 1 })}
        >
          -
        </button>
        <button
          className={makeClass('button', 'is-success', styles.addButton)}
          type="button"
          onClick={() => this.setState({ count: count + 1 })}
        >
          +
        </button>
      </div>
    );
  }
}

TestExtension.propTypes = {
  children: PropTypes.node
};

TestExtension.defaultProps = {
  children: null
};

export const extension = {
  name: 'test',
  component: TestExtension
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import makeClass from 'classnames';

import Icon from '../Icon';
import styles from './sidebar.css';

export class Sidebar extends Component {
  static propTypes = {
    className: PropTypes.string,
    currentPage: PropTypes.string,
    content: PropTypes.func
  };

  static defaultProps = {
    className: null,
    currentPage: null,
    content: null
  };

  state = {
    open: false
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside, false);
  }

  componentUnWillMount() {
    document.removeEventListener('mousedown', this.handleClickOutside, false);
  }

  handleClickOutside = e => {
    if (this.sidebar && this.sidebar.contains(e.target)) {
      return;
    }

    this.setState({
      open: false
    });
  };

  toggleSidebar = () => {
    const { open } = this.state;

    this.setState({
      open: !open
    });
  };

  render() {
    if (!this.props.content) {
      return null;
    }

    return (
      <div
        ref={ref => {
          this.sidebar = ref;
        }}
        className={makeClass(
          styles.root,
          'menu-list',
          this.props.className,
          this.state.open && styles.open
        )}
      >
        <button
          className={makeClass(
            'is-hidden-tablet',
            'button',
            'is-white',
            styles.toggle
          )}
          type="button"
          onClick={this.toggleSidebar}
        >
          {this.state.open ? (
            <Icon type="fas" icon="angle-left" />
          ) : (
            <Icon type="fas" icon="angle-right" />
          )}
        </button>
        {this.props.content && (
          <this.props.content
            className={styles.sidebar}
            currentPage={this.props.currentPage}
            onClick={this.handleClickOutside}
          />
        )}
      </div>
    );
  }
}

export default Sidebar;

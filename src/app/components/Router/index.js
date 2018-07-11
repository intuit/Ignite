import React, { Component } from 'react';
import PropTypes from 'prop-types';

import getLocation from './get-location';

class Router extends Component {
  state = {
    location: window.location
  };

  constructor(props) {
    super(props);

    window.history.replaceState(
      getLocation(window.location),
      null,
      window.location.pathname
    );
  }

  componentDidMount() {
    window.addEventListener('popstate', this.changeLocation);
    window.addEventListener('changeLocation', this.changeLocation);
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.changeLocation);
    window.removeEventListener('changeLocation', this.changeLocation);
  }

  changeLocation = newLocation => {
    this.setState({
      location: getLocation(newLocation.state || newLocation.detail)
    });
  };

  render() {
    const { children } = this.props;

    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { location: this.state.location })
    );

    return (
      <div
        ref={ref => {
          this.router = ref;
        }}
      >
        {childrenWithProps}
      </div>
    );
  }
}

Router.propTypes = {
  children: PropTypes.node.isRequired
};

export default Router;

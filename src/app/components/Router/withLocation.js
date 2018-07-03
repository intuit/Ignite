import React, { Component } from 'react';

export const getLocation = Location => ({
  pathname: Location.pathname,
  hash: Location.hash,
  query: Location.query
});

const Router = Comp =>
  class extends Component {
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
      window.removeEventListener('popstate');
      window.removeEventListener('changeLocation');
    }

    changeLocation = newLocation => {
      this.setState({
        location: getLocation(newLocation.state || newLocation.detail)
      });
    };

    render() {
      return (
        <Comp
          {...this.props}
          ref={ref => {
            this.component = ref;
          }}
          location={this.state.location}
        />
      );
    }
  };

export default Router;

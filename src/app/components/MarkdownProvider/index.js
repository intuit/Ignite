import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import App from '../App';

const noDocsFound = () => (
  <div>Hmmmm, somethings wrong. No docs files found....</div>
);

let internalUpdateCallback = () => {};

export const update = (...args) => internalUpdateCallback(...args);

export default class MarkdownProvider extends React.Component {
  static propTypes = {
    location: ReactRouterPropTypes.location.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      markdown: {
        docRootIndexFile: noDocsFound
      }
    };

    internalUpdateCallback = this.onUpdate;
  }

  onUpdate = (path, component, isIndex, firstLink) => {
    const { markdown } = this.state;

    markdown[path] = component;

    if (isIndex) {
      markdown.docRootIndexFile = component;
      markdown.firstPagePath = firstLink;
    }

    this.setState({
      markdown
    });
    return component;
  };

  render() {
    return (
      <App markdown={this.state.markdown} location={this.props.location} />
    );
  }
}

import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import App from '../App';

const noDocsFound = () => (
  <div>Hmmmm, somethings wrong. No docs files found....</div>
);

let internalUpdateCallback = () => {};
let internalUpdatePluginsCallback = () => {};

export const update = (...args) => internalUpdateCallback(...args);
export const updatePlugins = (...args) =>
  internalUpdatePluginsCallback(...args);

export default class MarkdownProvider extends Component {
  static propTypes = {
    location: ReactRouterPropTypes.location.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      markdown: {
        docRootIndexFile: noDocsFound
      },
      plugins: {}
    };

    internalUpdateCallback = this.onUpdate;
    internalUpdatePluginsCallback = this.onPluginUpdate;
  }

  onUpdate = (path, component, isIndex, firstLink) => {
    const { markdown } = this.state;

    markdown[path] = component;

    if (isIndex) {
      markdown.indexFiles = {
        ...markdown.indexFiles,
        [path]: firstLink
      };

      if (!markdown.firstPagePath) {
        markdown.docRootIndexFile = component;
        markdown.firstPagePath = firstLink;
      }
    }

    this.setState({
      markdown
    });
    return component;
  };

  onPluginUpdate = newPlugin => {
    const { plugins } = this.state;

    this.setState({
      plugins: Object.assign({}, plugins, {
        [newPlugin.name]: newPlugin
      })
    });
  };

  render() {
    return (
      <App
        markdown={this.state.markdown}
        location={this.props.location}
        plugins={this.state.plugins}
      />
    );
  }
}

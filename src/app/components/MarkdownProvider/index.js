import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import App from '../App';

const setMarkdown = (markdown = []) => {
  return markdown.reduce(
    (markdownMap, [pathToMarkdown, component, isIndex, firstLink]) => {
      markdownMap[pathToMarkdown] = component;

      if (isIndex) {
        markdownMap.indexFiles = {
          ...markdownMap.indexFiles,
          [markdownMap]: firstLink
        };
      }

      return markdownMap;
    },
    {}
  );
};

const setPlugins = plugins => {
  return plugins.reduce(
    (pluginMap, [name, component, options]) =>
      Object.assign({}, pluginMap, {
        [name]: {
          name,
          component,
          options
        }
      }),
    {}
  );
};

class MarkdownProvider extends Component {
  static propTypes = {
    location: ReactRouterPropTypes.location.isRequired
  };

  constructor(props) {
    super(props);

    this.markdown = setMarkdown(window.configuration.markdown);
    this.plugins = setPlugins(window.configuration.plugins);
  }

  render() {
    return (
      <App
        markdown={this.markdown}
        location={this.props.location}
        plugins={this.plugins}
      />
    );
  }
}

export default MarkdownProvider;

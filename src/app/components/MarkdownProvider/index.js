import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import App from '../App';

const setMarkdown = (markdown = []) => {
  return markdown.reduce(
    (markdownMap, [pathToMarkdown, component, isIndex, firstLink]) => {
      markdownMap[pathToMarkdown] = component;

      if (isIndex) {
        markdownMap.indexFiles = {
          ...markdownMap.indexFiles,
          [pathToMarkdown]: firstLink
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
    location: ReactRouterPropTypes.location.isRequired,
    markdown: PropTypes.array,
    plugins: PropTypes.array
  };

  static defaultProps = {
    markdown: [],
    plugins: []
  };

  constructor(props) {
    super(props);

    this.markdown = setMarkdown(props.markdown);
    this.plugins = setPlugins(props.plugins);
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

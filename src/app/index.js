import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

import App from './app';

const noDocsFound = () => (
  <div>Hmmmm, somethings wrong. No docs files found....</div>
);

const markdown = {
  docRootIndexFile: noDocsFound
};

let updateCallback = () => {};

class MarkdownProvider extends React.Component {
  static propTypes = {
    location: ReactRouterPropTypes.location.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      markdown
    };

    updateCallback = this.onUpdate;
  }

  onUpdate = () => {
    this.setState({
      markdown
    });
  };

  render() {
    return (
      <App markdown={this.state.markdown} location={this.props.location} />
    );
  }
}

ReactDOM.render(
  <HashRouter>
    <Route path="/" component={MarkdownProvider} />
  </HashRouter>,
  document.getElementById('index')
);

export default function registerMarkdown(
  path,
  markdownInJS,
  isIndex,
  firstLink
) {
  markdown[path] = markdownInJS;

  if (isIndex) {
    markdown.docRootIndexFile = markdownInJS;
    markdown.firstPagePath = firstLink;
  }

  updateCallback();

  return markdownInJS;
}

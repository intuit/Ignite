import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Link } from 'react-router-dom';

const noDocsFound = () => (
  <div>Hmmmm, somethings wrong. No docs files found....</div>
);

const markdown = {
  docRootIndexFile: noDocsFound
};

let updateCallback = () => {};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
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
    return this.state.markdown.docRootIndexFile();
  }
}

ReactDOM.render(
  <HashRouter>
    <Route path="/" component={App} />
  </HashRouter>,
  document.getElementById('index')
);

export default function registerMarkdown(path, markdownInJS, isIndex) {
  markdown[path] = markdownInJS;

  if (isIndex) {
    markdown.docRootIndexFile = markdownInJS;
  }

  updateCallback();

  return markdownInJS;
}

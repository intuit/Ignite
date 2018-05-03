import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

const noDocsFound = () => (
  <div>Hmmmm, somethings wrong. No docs files found....</div>
);

const markdown = {
  docRootIndexFile: noDocsFound
};

let updateCallback = () => {};

class App extends React.Component {
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
    const filePath = this.props.location.pathname.substring(1);
    let page = this.state.markdown[filePath];

    if (!page) {
      page = this.state.markdown.docRootIndexFile;
    }

    return page();
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

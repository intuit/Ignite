import React from 'react';
import makeClass from 'classnames';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

import Sidebar from './sidebar';
import styles from './index.css';

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
    let Page = this.state.markdown[filePath];

    if (!Page) {
      Page = this.state.markdown.docRootIndexFile;
    }

    return (
      <div className="container">
        <div className={makeClass(styles.App, 'row')}>
          <Sidebar className={makeClass('col', 'col-lg-3')} />
          <Page className={makeClass('col', 'col-lg-9')} />
        </div>
      </div>
    );
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

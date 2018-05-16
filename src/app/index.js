import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';

import MarkdownProvider from './components/MarkdownProvider';

function withGlobalConfig(Comp) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        markdown: window.configuration.markdown,
        plugins: window.configuration.plugins
      };

      window.configuration.setFirstLink = this.setFirstLink.bind(this);
    }

    setFirstLink(pathToMarkdown, firstLink) {
      const markdown = this.state.markdown.map(m => {
        if (m[0] === pathToMarkdown) {
          m[3] = firstLink;
        }

        return m;
      });

      this.setState({ markdown });
    }

    render() {
      return (
        <Comp
          {...this.props}
          markdown={this.state.markdown}
          plugins={this.state.plugins}
        />
      );
    }
  };
}

const MarkdownProviderWithConfig = withGlobalConfig(MarkdownProvider);

ReactDOM.render(
  <HashRouter>
    <Route
      path="/"
      component={props => <MarkdownProviderWithConfig {...props} />}
    />
  </HashRouter>,
  document.getElementById('index')
);

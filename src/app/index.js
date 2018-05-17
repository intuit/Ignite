import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';

import withGlobalConfig from './components/WithGlobalConfig';
import MarkdownProvider from './components/MarkdownProvider';

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

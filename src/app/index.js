import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';

import MarkdownProvider from './components/MarkdownProvider';

ReactDOM.render(
  <HashRouter>
    <Route
      path="/"
      component={props => (
        <MarkdownProvider
          {...props}
          markdown={window.configuration.markdown}
          plugins={window.configuration.plugins}
        />
      )}
    />
  </HashRouter>,
  document.getElementById('index')
);

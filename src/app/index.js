import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import withGlobalConfig from './components/WithGlobalConfig';
import MarkdownProvider from './components/MarkdownProvider';

const MarkdownProviderWithConfig = withGlobalConfig(MarkdownProvider);

ReactDOM.render(
  <BrowserRouter>
    <Route component={props => <MarkdownProviderWithConfig {...props} />} />
  </BrowserRouter>,
  document.getElementById('index')
);

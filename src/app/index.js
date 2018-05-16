import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';

import MarkdownProvider from './components/MarkdownProvider';

ReactDOM.render(
  <HashRouter>
    <Route path="/" component={MarkdownProvider} />
  </HashRouter>,
  document.getElementById('index')
);

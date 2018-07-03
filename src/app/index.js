import React from 'react';
import { render } from 'react-dom';

import Router from './components/Router';
import withGlobalConfig from './components/WithGlobalConfig';
import MarkdownProvider from './components/MarkdownProvider';

const MarkdownProviderWithConfig = withGlobalConfig(MarkdownProvider);

render(
  <Router>
    <MarkdownProviderWithConfig />
  </Router>,
  document.getElementById('index')
);

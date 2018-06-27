import React from 'react';
import { render } from 'react-dom';
import { Router } from '@reach/router';

import withGlobalConfig from './components/WithGlobalConfig';
import MarkdownProvider from './components/MarkdownProvider';

const MarkdownProviderWithConfig = withGlobalConfig(MarkdownProvider);
const rootElement = document.getElementById('index');

const IgniteApp = (
  <Router>
    <MarkdownProviderWithConfig path="*" />
  </Router>
);

render(IgniteApp, rootElement);

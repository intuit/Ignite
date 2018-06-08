import React from 'react';
import { hydrate, render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import withGlobalConfig from './components/WithGlobalConfig';
import MarkdownProvider from './components/MarkdownProvider';

const MarkdownProviderWithConfig = withGlobalConfig(MarkdownProvider);
const rootElement = document.getElementById('index');

const IgniteApp = (
  <BrowserRouter>
    <Route component={props => <MarkdownProviderWithConfig {...props} />} />
  </BrowserRouter>
);

if (rootElement.hasChildNodes()) {
  hydrate(IgniteApp, rootElement);
} else {
  render(IgniteApp, rootElement);
}

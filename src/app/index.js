import React from 'react';
import { hydrate, render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import withGlobalConfig from './components/WithGlobalConfig';
import MarkdownProvider from './components/MarkdownProvider';

const MarkdownProviderWithConfig = withGlobalConfig(MarkdownProvider);
const rootElement = document.getElementById('index');

if (rootElement.hasChildNodes()) {
  hydrate(
    <BrowserRouter>
      <Route component={props => <MarkdownProviderWithConfig {...props} />} />
    </BrowserRouter>,
    rootElement
  );
} else {
  render(
    <BrowserRouter>
      <Route component={props => <MarkdownProviderWithConfig {...props} />} />
    </BrowserRouter>,
    rootElement
  );
}

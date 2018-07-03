import React from 'react';
import { render } from 'react-dom';

import withLocation from './components/Router/withLocation';
import withGlobalConfig from './components/WithGlobalConfig';
import MarkdownProvider from './components/MarkdownProvider';

const rootElement = document.getElementById('index');
const MarkdownProviderWithConfig = withLocation(
  withGlobalConfig(MarkdownProvider)
);

render(<MarkdownProviderWithConfig />, rootElement);

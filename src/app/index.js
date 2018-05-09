import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';

import MarkdownProvider, {
  update,
  updatePlugins
} from './components/MarkdownProvider';

ReactDOM.render(
  <HashRouter>
    <Route path="/" component={MarkdownProvider} />
  </HashRouter>,
  document.getElementById('index')
);

export const registerPlugin = (name, component) =>
  updatePlugins({ name, component });

export const registerMarkdown = (path, markdownInJS, isIndex, firstLink) =>
  update(path, markdownInJS, isIndex, firstLink);

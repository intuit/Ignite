import React from 'react';
import ReactDOM from 'react-dom';

const markdown = {};

const Index = props => {
  console.log(props);
  return <div>Hello React!</div>;
};

ReactDOM.render(<Index />, document.getElementById('index'));

export default function registerMarkdown(path, markdownInJS) {
  markdown[path] = markdownInJS;
  console.log('registerMarkdown', path);
  return markdownInJS;
}

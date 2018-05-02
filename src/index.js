import React from 'react';
import ReactDOM from 'react-dom';

const Index = props => {
  console.log(props);
  return <div>Hello React!</div>;
};

ReactDOM.render(<Index />, document.getElementById('index'));

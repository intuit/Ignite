import React from 'react';
import makePlugin from '../ignite-plugin';

const testExtension = props => {
  return (
    <div>
      <h1> What a useful plugin I am! </h1>
      {props.children}
    </div>
  );
};

export const extension = {
  name: 'test',
  component: testExtension
};

export default makePlugin('test', testExtension);

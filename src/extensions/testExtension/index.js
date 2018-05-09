import React from 'react';
import makePlugin from '../ignite-plugin';

const testExtension = () => <div>foo</div>;

export const extension = {
  name: 'test',
  component: testExtension
};

export default makePlugin('test', testExtension);

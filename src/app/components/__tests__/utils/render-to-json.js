import ShallowRenderer from 'react-test-renderer/shallow';

const renderer = new ShallowRenderer();

const renderToJson = jsx => {
  renderer.render(jsx);

  return renderer.getRenderOutput();
};

export default renderToJson;

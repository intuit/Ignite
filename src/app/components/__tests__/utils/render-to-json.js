import ShallowRenderer from 'react-test-renderer/shallow';

let renderer = new ShallowRenderer();

const renderToJson = (jsx, options = {}) => {
  if (options.new) {
    renderer = new ShallowRenderer();
  }

  renderer.render(jsx);

  return renderer.getRenderOutput();
};

export default renderToJson;

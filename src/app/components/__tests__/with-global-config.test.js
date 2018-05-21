import React from 'react';
import withGlobalConfig from '../WithGlobalConfig';
import renderToJson from './utils/render-to-json';

describe('withGlobalConfig', () => {
  let component;

  beforeAll(() => {
    window.configuration = {
      markdown: [
        ['index.md', () => <div> Foo </div>],
        ['page.md', () => <div> Foo </div>]
      ],
      plugins: [['somePlugin', () => <div> Plugin </div>]]
    };

    component = () => {};
  });

  test('renders component with configuration', () => {
    const ComponentWithConfig = withGlobalConfig(component);
    expect(renderToJson(<ComponentWithConfig />)).toMatchSnapshot();
  });

  test('renders blog hero', () => {
    const ComponentWithConfig = withGlobalConfig(component);
    expect(renderToJson(<ComponentWithConfig />)).toMatchSnapshot();
    window.configuration.setBlogHero('http://some.link');
    expect(renderToJson(<ComponentWithConfig />)).toMatchSnapshot();
  });

  test('sets first page', () => {
    const ComponentWithConfig = withGlobalConfig(component);
    expect(renderToJson(<ComponentWithConfig />)).toMatchSnapshot();
    window.configuration.setFirstLink('index.md', 'page.md');
    expect(renderToJson(<ComponentWithConfig />)).toMatchSnapshot();
  });
});

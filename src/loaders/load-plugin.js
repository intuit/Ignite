import { getOptions } from 'loader-utils';

export default function(source) {
  const options = getOptions(this);
  let name = 'defaultPluginToken';

  if (options.plugins) {
    options.plugins.forEach(option => {
      const partialPath = option[1].slice(3);

      if (this.resourcePath.includes(partialPath)) {
        [name] = option;
      }
    });
  }

  return `
    import { registerPlugin } from 'ignite';

    ${source}

    exports.default && registerPlugin('${name}', exports.default)
  `;
}

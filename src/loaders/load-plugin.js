export default function(source) {
  return `
    import { registerPlugin } from 'ignite';

    ${source}

    exports.extension && registerPlugin(exports.extension)
  `;
}

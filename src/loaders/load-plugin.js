export default function(source) {
  return `
    import { registerPlugin } from 'ignite';

    ${source}

    exports.default && registerPlugin(exports.default)
  `;
}

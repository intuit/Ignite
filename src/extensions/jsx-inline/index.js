/* eslint-disable camelcase */

export default function bulmaMessage(md) {
  md.renderer.rules.jsx_inline = function(tokens, idx) {
    let { content } = tokens[idx];

    if (content[0] !== '{') {
      content = content.replace(new RegExp('{', 'g'), '!{');
      content = content.replace(new RegExp('}', 'g'), '!}');
    }

    return content;
  };
}

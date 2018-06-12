/* eslint-disable camelcase */

function escape_code(defaultRenderer) {
  return function(tokens, idx, options, env, slf) {
    tokens[idx].content = tokens[idx].content.slice(2, -2);

    return defaultRenderer(tokens, idx, options, env, slf);
  };
}

export default function jsxFence(md) {
  md.renderer.rules.fence = escape_code(md.renderer.rules.fence);
  md.renderer.rules.code_inline = escape_code(md.renderer.rules.code_inline);
  md.renderer.rules.code_block = escape_code(md.renderer.rules.code_block);
}

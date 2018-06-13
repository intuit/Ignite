/* eslint-disable camelcase */

function injectPluginProvider(markup) {
  const componentRegex = /<([A-Z][A-Za-z]+)/;
  const sources = [];

  let match = componentRegex.exec(markup);

  while (match) {
    console.log(match[1]);
    markup = markup.replace(
      componentRegex,
      "<pluginprovider name=!{'$1'!} plugins=!{props.plugins!}"
    );
    match = componentRegex.exec(markup);
  }

  return markup;
}

export default function jsxInline(md) {
  md.renderer.rules.jsx_inline = function(tokens, idx) {
    let { content } = tokens[idx];

    if (content[0] !== '{') {
      content = content.replace(new RegExp('{', 'g'), '!{');
      content = content.replace(new RegExp('}', 'g'), '!}');

      content = injectPluginProvider(content);
    }

    return content;
  };
}

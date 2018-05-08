import makePlugin from 'markdown-it-regexp';

const typeString = makePlugin(/#:(?=\S)[^:]+ (?=\S)[^#]+/, match => {
  match = match[0].substring(match[0].indexOf(':') + 1);
  const [type, ...string] = match.split(' ');

  return `
    <span class="tag ${type}">
      ${string.join(' ')}
    </span>
  `;
});

const typeStringSize = makePlugin(/#:[(?=\S)[^:]+:[\S]+ (?=\S)[^#]+/, match => {
  match = match[0].substring(match[0].indexOf(':') + 1);
  const [classes, ...string] = match.split(' ');
  const [type, size] = classes.split(':');

  return `
    <span class="tag ${type} ${size}">
      ${string.join(' ')}
    </span>
  `;
});

export default function bulmaTag(md) {
  md.use(typeString);
  md.use(typeStringSize);
}

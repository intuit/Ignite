import makePlugin from 'markdown-it-regexp';

export default function bulmaTag(md) {
  md.use(
    makePlugin(/#:[\S]+ (?=\S)[^#]+/, match => {
      match = match[0].substring(match[0].indexOf(':') + 1);
      const [type, ...string] = match.split(' ');
      console.log(type, string);
      return `
      <a class="tag ${type}">${string.join(' ')}</a>
      `;
    })
  );
}

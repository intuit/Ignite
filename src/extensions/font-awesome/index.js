import makePlugin from 'markdown-it-regexp';

export default function fontawesomePlugin(md) {
  md.use(
    makePlugin(/:[a-z]{2,}-[a-z]{2,}:/, match => {
      const [type, icon] = match[0].split(':')[1].split('-');
      return `<i class="${type} fa-${icon}"></i>`;
    })
  );
}

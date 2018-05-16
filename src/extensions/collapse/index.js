import container from 'markdown-it-container';

const regExp = /collapse/;

const collapse = md => ({
  validate(params) {
    return params.trim().match(regExp);
  },

  render(tokens, idx) {
    const m = tokens[idx].info.trim().match(/^collapse\s+(.*)$/);

    if (tokens[idx].nesting === 1) {
      let isOpen;
      let children = '';

      if (m && m[1]) {
        isOpen = m[1].split(' ')[0] === 'open';
        let [, rest] = m;

        if (isOpen) {
          rest = m[1]
            .split(' ')
            .slice(1)
            .join(' ');
        }

        children = md.renderInline(rest);
      }

      return `
        <details ${isOpen ? 'open' : ''}>
          <summary style=!{!{display: 'flex',alignItems: 'center', padding: 7, position: 'relative',paddingLeft: 0!}!}>
            <p>${children}</p>
          </summary>
      `;
    }

    return `
      </details>
    `;
  }
});

export default function collapseBlock(md) {
  md.use(container, 'collapse', collapse(md));
}

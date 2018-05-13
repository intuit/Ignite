import container from 'markdown-it-container';
import parseClasses from '../utils/parse-classes';

const regExp = /collapse/;

const collapse = md => ({
  validate(params) {
    return params.trim().match(regExp);
  },

  render(tokens, idx) {
    const m = tokens[idx].info.trim().match(/^collapse\s+(.*)$/);

    if (tokens[idx].nesting === 1) {
      return `
        <details open>
          <summary style=!{!{display: 'flex',alignItems: 'center', padding: 7, position: 'relative'!}!} className="menu-label">
            ${md.renderInline(m[1])}
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

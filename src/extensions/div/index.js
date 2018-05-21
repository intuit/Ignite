import container from 'markdown-it-container';
import parseClasses from '../utils/parse-classes';

const regExp = /div/;

const div = {
  validate(params) {
    return params.trim().match(regExp);
  },

  render(tokens, idx) {
    const classList = parseClasses(tokens[idx].info);
    const classAttr =
      (tokens[idx].attrs || []).find(([key]) => key === 'class') || [];
    console.log(`${classAttr[1]} ${classList.join(' ')}`);
    if (tokens[idx].nesting === 1) {
      return `
          <div class="${classAttr[1]} ${classList.join(' ')}">
      `;
    }

    return `
      </div>
    `;
  }
};

export default function bulmaMessage(md) {
  md.use(container, 'div', div);
}

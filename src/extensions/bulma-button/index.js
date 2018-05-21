import container from 'markdown-it-container';
import parseClasses from '../utils/parse-classes';

const regExp = /button/;

const button = {
  validate(params) {
    return params.trim().match(regExp);
  },

  render(tokens, idx) {
    const classList = parseClasses(tokens[idx].info);

    if (tokens[idx].nesting === 1) {
      return `
          <button class="button  ${classList.join(' ')}">
      `;
    }

    return `
      </button>
    `;
  }
};

export default function bulmaMessage(md) {
  md.use(container, 'button', button);
}

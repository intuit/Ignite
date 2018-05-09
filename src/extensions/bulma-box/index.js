import container from 'markdown-it-container';
import parseClasses from '../utils/parse-classes';

const regExp = /box/;

const box = {
  validate(params) {
    return params.trim().match(regExp);
  },

  render(tokens, idx) {
    const classList = parseClasses(tokens[idx].info);

    if (tokens[idx].nesting === 1) {
      return `
        <div class="column ${classList.join(' ')}">
          <div class="box">
      `;
    }

    return `
        </div>
      </div>
    `;
  }
};

export default function bulmaMessage(md) {
  md.use(container, 'box', box);
}

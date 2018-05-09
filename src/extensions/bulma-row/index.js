import container from 'markdown-it-container';
import parseClasses from '../utils/parse-classes';

const regExp = /row/;

const row = {
  marker: '|',

  validate(params) {
    return params.trim().match(regExp);
  },

  render(tokens, idx) {
    const classList = parseClasses(tokens[idx].info);

    if (tokens[idx].nesting === 1) {
      return `
        <div class="columns ${classList.join(' ')}">
      `;
    }

    return `
      </div>
    `;
  }
};

export default function bulmaRow(md) {
  md.use(container, 'row', row);
}

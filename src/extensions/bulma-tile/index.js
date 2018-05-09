import container from 'markdown-it-container';
import parseClasses from '../utils/parse-classes';

const regExp = /tile/;

const tile = {
  validate(params) {
    return params.trim().match(regExp);
  },

  render(tokens, idx) {
    const classList = parseClasses(tokens[idx].info);

    if (tokens[idx].nesting === 1) {
      return `
        <div class="tile ${classList.join(' ')}">
      `;
    }

    return `
      </div>
    `;
  }
};

export default function bulmaTile(md) {
  md.use(container, 'tile', tile);
}

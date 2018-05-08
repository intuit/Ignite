import container from 'markdown-it-container';

const regExp = /tile/;
const withOptions = /tile [\S ]+/;

const tile = {
  validate(params) {
    return params.trim().match(regExp);
  },

  render(tokens, idx) {
    const options = tokens[idx].info;

    let classList = [];

    if (options.trim().match(withOptions)) {
      const [, ...userOptions] = options
        .trim()
        .match(withOptions)[0]
        .split(' ');
      classList = [...userOptions];
    }

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

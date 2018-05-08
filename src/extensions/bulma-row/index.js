import container from 'markdown-it-container';

const regExp = /row/;

const row = {
  marker: '|',

  validate(params) {
    return params.trim().match(regExp);
  },

  render(tokens, idx) {
    if (tokens[idx].nesting === 1) {
      return `
        <div class="columns">
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

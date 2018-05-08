import container from 'markdown-it-container';

const regExp = /box/;

const box = {
  validate(params) {
    return params.trim().match(regExp);
  },

  render(tokens, idx) {
    if (tokens[idx].nesting === 1) {
      return `
        <div class="column">
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

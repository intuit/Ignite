import container from 'markdown-it-container';

const regExp = /hero/;
const withOptions = /hero [\S ]+/;

const hero = {
  validate(params) {
    return params.trim().match(withOptions) || params.trim().match(regExp);
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
      tokens[idx + 1].attrs = [...tokens[idx + 1].attrs, ['class', 'title']];
      tokens[idx + 4].attrs = [...tokens[idx + 4].attrs, ['class', 'subtitle']];

      return `
        <section class="hero ${classList.join(' ')}">
          <div class="hero-body">
      `;
    }

    return `
        </div>
      </section>
    `;
  }
};

export default function bulmaProgress(md) {
  md.use(container, 'hero', hero);
}

import container from 'markdown-it-container';
import parseClasses from '../utils/parse-classes';

const regExp = /hero/;

const hero = {
  validate(params) {
    return params.trim().match(regExp);
  },

  render(tokens, idx) {
    const classList = parseClasses(tokens[idx].info);

    if (tokens[idx].nesting === 1) {
      if (tokens[idx + 1].type.includes('open')) {
        if (tokens[idx + 1].attrs) {
          tokens[idx + 1].attrs = [
            ...tokens[idx + 1].attrs,
            ['class', 'title']
          ];
        } else {
          tokens[idx + 1].attrs = [['class', 'title']];
        }
      }

      if (tokens[idx + 4].type.includes('open')) {
        if (tokens[idx + 4].attrs) {
          tokens[idx + 4].attrs = [
            ...tokens[idx + 4].attrs,
            ['class', 'subtitle']
          ];
        } else {
          tokens[idx + 4].attrs = [['class', 'subtitle']];
        }
      }

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

export default function bulmaHero(md) {
  md.use(container, 'hero', hero);
}

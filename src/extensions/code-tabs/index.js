import container from 'markdown-it-container';

const regExp = /codeTabs [\S ]+/;

const codeTabs = {
  validate(params) {
    return params.trim().match(regExp);
  },

  render(tokens, idx) {
    if (tokens[idx].nesting === 1) {
      const [, options] = tokens[idx].info.split('codeTabs');
      const [, ...titles] = options.split(' ');

      return `
        <div class="codeTabs">
          <div class="tabs is-boxed">
            <ul>
              ${titles
                .map(
                  (title, index) => `
                <li class="${index === 0 && 'is-active'}">
                  <a>
                    <span>${title}</span>
                  </a>
                </li>
              `
                )
                .join('\n')}
            </ul>
          </div>
          <div class="codeBlocks">
      `;
    }

    return `
        </div>
      </div>
    `;
  }
};

export default function codeTabsPlugin(md) {
  md.use(container, 'codeTabs', codeTabs);
}

import container from 'markdown-it-container';

const regExp = /collapse/;

const collapse = md => ({
  validate(params) {
    return params.trim().match(regExp);
  },

  render(tokens, idx) {
    const m = tokens[idx].info.trim().match(/^collapse\s+(.*)$/);
    let childLinks = [];

    if (tokens[idx].nesting === 1) {
      let isOpen;
      let children = '';

      if (m && m[1]) {
        isOpen = m[1].split(' ')[0] === 'open';
        let [, rest] = m;

        childLinks = tokens
          .slice(
            idx,
            idx +
              tokens
                .slice(idx)
                .findIndex(token => token.type === 'container_collapse_close')
          )
          .map(token => token.content)
          .filter(content => content !== '')
          .map(link => link.slice(link.indexOf('(') + 1, link.indexOf(')')));

        if (isOpen) {
          rest = m[1]
            .split(' ')
            .slice(1)
            .join(' ');
        }

        children = md.renderInline(rest);
      }

      return `
        <details
          open=!{
            ${isOpen} ||
            ${JSON.stringify(childLinks)}.find(link => (
              link === ((this && this.props) || props).currentPage ||
              (((this && this.props) || props).currentPage === process.env.baseURL &&
                link === window.configuration.currentFirstPage.replace('.md', ''))
              )
            )
          !}
        >
          <summary className='collapse-summary'>
            <p>${children}</p>
          </summary>
      `;
    }

    return `
      </details>
    `;
  }
});

export default function collapseBlock(md) {
  md.use(container, 'collapse', collapse(md));
}

import makePlugin from 'markdown-it-regexp';

const value = makePlugin(/%% [\d]+ %%/, match => {
  const [, value] = match[0].split(' ');

  return `<progress class="progress" value="${value}" max="100">${value}%</progress>`;
});

const valueOptions = makePlugin(/%% [\d]+ is-[\S]+ [\S ]+ %%/, match => {
  const [, value, ...options] = match[0].split(' ');
  const classList = [];

  // Don't care about the last %%
  options.pop();

  while (
    options[0] &&
    (options[0].includes('is-') || options[0].includes('has-'))
  ) {
    classList.push(options.shift());
  }

  return `
    <div class="progress-with-message">
      <progress class="progress ${classList.join(
        ' '
      )}" value="${value}" max="100">
        ${value}%
      </progress>
      <span class="progress-message">${options.join(' ')}</span>
    </div>
  `;
});

export default function bulmaProgress(md) {
  md.use(value);
  md.use(valueOptions);
}

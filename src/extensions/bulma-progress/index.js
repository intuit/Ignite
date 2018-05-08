import makePlugin from 'markdown-it-regexp';

const value = makePlugin(/%% [\d]+ %%/, match => {
  const value = match[0].split(' ')[1];

  return `<progress class="progress" value="${value}" max="100">${value}%</progress>`;
});

const valueColor = makePlugin(/%% [\d]+:(?=\S)[^: ]+ %%/, match => {
  const [value, color] = match[0].split(' ')[1].split(':');

  return `<progress class="progress ${color}" value="${value}" max="100">${value}%</progress>`;
});

const valueColorSize = makePlugin(/%% [\d]+:(?=\S)[^:]+:[\S]+ %%/, match => {
  const [value, color, size] = match[0].split(' ')[1].split(':');

  return `<progress class="progress ${color} ${size}" value="${value}" max="100">${value}%</progress>`;
});

const valueMessage = makePlugin(/%% [\d]+ [\S ]+ %%/, match => {
  const [, value, ...message] = match[0].split(' ');

  message.splice(-1, 1);

  return `<div class="progress-with-message">
    <progress class="progress" value="${value}" max="100">
      ${value}%
    </progress>
    <span class="progress-message">${message.join(' ')}</span>
  </div>`;
});

const valueColorMessage = makePlugin(
  /%% [\d]+:(?=\S)[^:]+ [\S ]+ %%/,
  match => {
    const [, progressOptions, ...message] = match[0].split(' ');
    const [value, color] = progressOptions.split(':');

    message.splice(-1, 1);

    return `<div class="progress-with-message">
    <progress class="progress ${color}" value="${value}" max="100">
      ${value}%
    </progress>
    <span class="progress-message">${message.join(' ')}</span>
  </div>`;
  }
);

const valueColorSizeMessage = makePlugin(
  /%% [\d]+:(?=\S)[^:]+:[\S]+ [\S ]+ %%/,
  match => {
    const [, progressOptions, ...message] = match[0].split(' ');
    const [value, color, size] = progressOptions.split(':');

    message.splice(-1, 1);

    return `<div class="progress-with-message">
    <progress class="progress ${color} ${size}" value="${value}" max="100">
      ${value}%
    </progress>
    <span class="progress-message">${message.join(' ')}</span>
  </div>`;
  }
);

export default function bulmaProgress(md) {
  md.use(value);
  md.use(valueColor);
  md.use(valueColorSize);
  md.use(valueMessage);
  md.use(valueColorSizeMessage);
  md.use(valueColorMessage);
}

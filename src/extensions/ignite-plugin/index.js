import container from 'markdown-it-container';

function isNumeric(num) {
  return !isNaN(num);
}

function convertBool(value) {
  if (value === 'false') {
    return false;
  }

  if (value === 'true') {
    return true;
  }
}

function isBool(value) {
  return value === 'false' || value === 'true';
}

export const parseArgs = rawOptions => {
  [, ...rawOptions] = rawOptions.trim().split(' ');
  const options = [];
  const properties = {};

  rawOptions.forEach(rawOption => {
    if (rawOption.includes('=')) {
      let [property, value] = rawOption.split('=');

      if (isNumeric(value)) {
        value = Number(value);
      } else if (isBool(value)) {
        value = convertBool(value);
      } else if (value.includes(['"', "'", '{', '['])) {
        value = JSON.parse(value);
      }

      properties[property] = value;
    } else {
      options.push(rawOption);
    }
  });

  return {
    options,
    properties
  };
};

const makePlugin = name => {
  const regExp = new RegExp(name);

  const plugin = {
    validate(params) {
      return params.trim().match(regExp);
    },

    render(tokens, idx) {
      let options = tokens[idx].info;
      options = parseArgs(options);

      if (tokens[idx].nesting === 1) {
        return `
          <pluginprovider
            name='${name}'
            plugins=!{props.plugins!}
            options=!{${JSON.stringify(options)}!}
          >
        `;
      }

      return '</pluginprovider>';
    }
  };

  return md => {
    container(md, 'plugin', plugin);
  };
};

export default makePlugin;

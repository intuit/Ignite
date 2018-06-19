import container from 'markdown-it-container';

function isNumeric(num) {
  return !isNaN(num);
}

function convertBool(value) {
  if (value === 'true') {
    return true;
  }

  return false;
}

function isBool(value) {
  return value === 'false' || value === 'true';
}

function joinJSON(rawOptions) {
  const startChars = ['"', "'", '{', '['];
  const endChars = ['"', "'", '}', ']'];

  const options = [];
  const delimeterStack = [];
  let inEqual = false;

  rawOptions.forEach(rawOption => {
    // Doesn't check for validity. Just check start and end chars are equal
    rawOption.split('').forEach(char => {
      if (startChars.includes(char)) {
        delimeterStack.push(char);
      } else if (endChars.includes(char)) {
        delimeterStack.pop(char);
      }
    });

    if (rawOption.includes('=')) {
      options.push(rawOption);

      if (delimeterStack.length !== 0) {
        inEqual = true;
      }
    } else if (inEqual) {
      options[options.length - 1] = `${
        options[options.length - 1]
      } ${rawOption}`;

      if (delimeterStack.length === 0) {
        inEqual = false;
      }
    } else {
      options.push(rawOption);
    }
  });

  return options;
}

export const parseArgs = rawOptions => {
  [, ...rawOptions] = rawOptions.trim().split(' ');
  const options = [];
  const props = {};

  joinJSON(rawOptions).forEach(rawOption => {
    if (rawOption.includes('=')) {
      let [property, value] = rawOption.split('=');

      if (isNumeric(value)) {
        value = Number(value);
      } else if (isBool(value)) {
        value = convertBool(value);
      } else if (
        value.includes('{') ||
        value.includes('[') ||
        value.includes('"') ||
        value.includes("'")
      ) {
        value = JSON.parse(value);
      }

      props[property] = value;
    } else {
      options.push(rawOption);
    }
  });

  return {
    options,
    props
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

      const safeOptions = JSON.stringify(options)
        .replace(new RegExp('{', 'g'), '!{')
        .replace(new RegExp('}', 'g'), '!}');

      if (tokens[idx].nesting === 1) {
        const htmlAttrs = tokens[idx].attrs || [];
        const classNames = htmlAttrs
          .filter(([key]) => key === 'class')
          .map(([, value]) => value);

        return `
          <div className="${classNames.join(' ')}">
            <pluginprovider
              name='${name}'
              plugins=!{props.plugins!}
              options=!{${safeOptions}!}
            >
        `;
      }

      return `
          </pluginprovider>
        </div>
      `;
    }
  };

  return md => {
    container(md, name, plugin);
  };
};

export default makePlugin;

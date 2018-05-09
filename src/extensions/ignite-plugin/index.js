import container from 'markdown-it-container';

const makePlugin = name => {
  const regExp = new RegExp(name);

  const plugin = {
    validate(params) {
      return params.trim().match(regExp);
    },

    render(tokens, idx) {
      const options = tokens[idx].info;
      const [, ...userOptions] = options.trim().split(' ');

      if (tokens[idx].nesting === 1) {
        return `
          <pluginprovider
            name='${name}'
            plugins=!{props.plugins!}
            options=!{${JSON.stringify(userOptions)}!}
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

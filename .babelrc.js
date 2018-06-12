module.exports = function(params) {
  const isProd = params.env() === 'production';

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current'
          }
        }
      ],
      '@babel/preset-react',
      '@babel/preset-stage-3'
    ],
    plugins: [
      '@babel/plugin-transform-react-constant-elements',
      '@babel/transform-react-inline-elements',
      'add-module-exports',
      isProd && [
        'babel-plugin-transform-react-remove-prop-types',
        {
          additionalLibraries: ['react-router-prop-types', 'prop-types'],
          removeImport: true
        }
      ]
    ].filter(Boolean)
  };
};

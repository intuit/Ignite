module.exports = function(params) {
  const isProd = params.env() === 'production';

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current'
          },
          modules: 'commonjs'
        }
      ],
      '@babel/preset-react'
    ],
    plugins: [
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-syntax-dynamic-import',
      ['@babel/plugin-proposal-class-properties', { loose: false }],
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

// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript', // Ensure TS is also handled if needed
    '@babel/preset-react'       // Add this line to enable JSX parsing
  ],
  // If you're using React 17+ and the new JSX transform:
  plugins: [
    ['@babel/transform-react-jsx', { runtime: 'automatic' }]
  ]
};

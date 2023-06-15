const Dotenv = require('dotenv-webpack');

module.exports = {
  // ... your existing webpack configuration ...
  plugins: [
    // ... your existing plugins ...
    new Dotenv(),
  ],
};

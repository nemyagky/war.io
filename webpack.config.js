const path = require('path');

module.exports = {
   entry: './src/js/game/Gameloop.ts',
   output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist')
   },
   module: {
      rules: [
         {
            test: /\.ts$/,
            use: ["awesome-typescript-loader", "babel-loader"],
            exclude: /node_modules/,
         },
      ]
   },
   resolve: {
      extensions: [".tsx", ".ts", ".js"]
   },
};

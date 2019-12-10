const path = require('path');

module.exports = {
   entry: './app/js/Gameloop.ts',
   output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist')
   },
   module: {
      rules: [
         {
            test: /\.ts$/,
            loader: 'awesome-typescript-loader',
            exclude: /node_modules/,
         },
         {
            test: /\.scss$/,
            use: [
               'style-loader',
               'css-loader',
               'sass-loader'
            ]
         },
      ]
   },
   resolve: {
      extensions: [".tsx", ".ts", ".js"]
   },
};

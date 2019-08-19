const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let conf = {
   entry: './app/js/gameloop.js',
   output: {
      'path': path.resolve(__dirname, './dist'),
      'filename': 'main.js',
      publicPath: 'dist/'
   },
   devServer: {
      overlay: true
   }, 
   module: {
      rules: [
         {
            test: /\.js$/,
            loader: 'babel-loader'
            /* exclude: '/node_modules' */
         },
         {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
               fallback: "style-loader",
               use: "css-loader"
             })
         },
         {
            test: /\.sass$/,
            use: ExtractTextPlugin.extract({
               fallback: "style-loader",
               use: [
                  "css-loader",
                  "sass-loader"
               ]
             })
        }
      ]
   },
   plugins: [
      new ExtractTextPlugin("styles.css"),
   ]
}

module.exports = (env, options) => {
   let production = options.mode === 'production';

   conf.devtool = production ? false : 'eval-sourcemap';

   return conf;
}

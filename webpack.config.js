const path = require('path')

module.exports = (paths) => {
   return {
      entry: './app/js/gameloop.ts',
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
               test: /\.scss$/,
               include: paths,
               use: [
                  'style-loader',
                  'css-loader',
                  'sass-loader'
               ]
            }
         ]
      },
   }
}

const path = require("path")

const images = ["jpg", "jpeg", "gif", "png", "svg", "bmp"]
const fonts = ["eot", "ttf", "otf", "woff", "woff2", "svg"]
const files = [
  ...images,
  ...fonts,
]

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
    publicPath: 'dist/',
  },
  devServer: {
    overlay: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.less$/,
        exclude: '/node_modules',
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: new RegExp(`\\.(${files.join('|')})$`),
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: false,
              encoding: false,
              name: '[path][name].[ext]',
            },
          },
        ],
      },
    ],
  },
}
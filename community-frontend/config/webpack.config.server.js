const path = require('path');
const webpack = require('webpack');
const paths = require('./paths');
const getClientEnviroment = require('./env');

// 환경 변수를 설정합니다.
const publicPath = paths.servedPath;
const publicUrl = publicPath.slice(0, -1);
const env = getClientEnviroment(publicUrl);

module.exports = {
  entry: paths.ssrJs,
  target: 'node', // node 전용으로 번들링한다는 것을 명시합니다.
  output: {
    path: paths.ssrBuild,
    filename: 'render.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    // 각 파일을 불러올 때 설정
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|jsx)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            // options: {
            //   cacheDirectory: true
            // },
          },
          {
            test: /\.css$/,
            loader: require.resolve('css-loader/locals'),
          },
          {
            test: /\.scss$/,
            use: [
              {
                loader: require.resolve('css-loader/locals'),
                // 이거 주석처리하니까 서버사이드 렌더링css가 보이기 시작함
                options: {
                  importLoaders: 1,
                  modules: true,
                  localIdentName: '[name]__[local}___[hash:base64:5]'
                  // localIdentName: '[name]'
                },
              },
              {
                loader: require.resolve('sass-loader'),
                options: {
                  includePaths: [paths.globalStyles]
                }
              }
            ]
          },
          {
            loader: require.resolve('file-loader'),
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
              // 경로만 생성하고 실제로 파일을 따로 저장하지는 않는다.
              emitFile: false
            },
          }
        ]
      }
    ]
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules].concat(
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    )
  },
  plugins: [
    new webpack.DefinePlugin(env.stringified),
  ],
};
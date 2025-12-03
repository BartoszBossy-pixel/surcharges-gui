const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    entry: './main.ts',
    
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    
    plugins: [
      new HtmlWebpackPlugin({
        template: './test-typescript.html',
        filename: 'index.html',
        inject: 'body',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'data',
            to: 'data',
          },
          {
            from: 'templates',
            to: 'templates',
          },
          {
            from: 'form-styles.css',
            to: 'form-styles.css',
          },
        ],
      }),
    ],
    
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 3000,
      open: true,
      hot: true,
      liveReload: true,
      watchFiles: ['**/*.html', '**/*.css', '**/*.json'],
    },
    
    devtool: isProduction ? 'source-map' : 'eval-source-map',
  };
};
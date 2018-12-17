const path = require('path');
const glob = require('glob');
const webpack = require('webpack');

const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  webpack(config) {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      }),
      new CompressionPlugin({
          asset: "[path].gz[query]",
          algorithm: "gzip",
          test: /\.js$|\.html$|\.css$|\.scss/,
          threshold: 10240,
          minRatio: 0.8
      }),
      new webpack.ContextReplacementPlugin(
          /moment[\/\\]locale$/,
          /en-gb|zh-cn/
      )
    );

    if (process.env.NODE_ENV === 'production') {
        config.plugins.push(new UglifyJsPlugin({ sourceMap: true, parallel: true }));
    }

    if (process.env.NODE_ENV === 'optimization'){
        config.plugins.push(new BundleAnalyzerPlugin());
    }

    config.module.rules.push(
      {
        test: /\.(css|scss)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]',
          minimize: true
        }
      },
      {
        test: /\.(mov|mp4)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader']
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          'babel-loader',
          'raw-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['styles', 'node_modules']
                .map(d => path.join(__dirname, d))
                .map(g => glob.sync(g))
                .reduce((a, c) => a.concat(c), [])
            }
          }
        ]
      }
    )
    return config
  },
  exportPathMap() {
    const paths = glob.sync('pages/**')
    const pages = paths
      .map(path => {
        path = path.replace(/^pages/, '')
        path = path.replace('index.js', '')
        path = path.replace('.js', '')

        if (path === '/_document') return null
        if (path === '/') return path

        path = path.replace(/\/$/, '')
        return path
      })
      .filter(Boolean)

    const pageMap = pages.reduce((map, page) => {
      map[page] = { page }
      return map
    }, {})

    return pageMap
  }
}

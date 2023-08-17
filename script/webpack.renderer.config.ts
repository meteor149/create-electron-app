import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

rules.push(
    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loader: 'ts-loader',
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.less$/,
      use: ['style-loader', 'css-loader',
        {
          loader: 'less-loader',
          options: {
            lessOptions:{
              strictMath: false,
              javascriptEnabled: true
            }
          },
        }
      ]
    },
    {
      test: /\.(ico|png|jpe?g|eot|woff?2?)$/,
      type: 'asset/resource',
    },
    {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    }
);

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
};

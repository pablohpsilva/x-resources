// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

const babelPlugins = ['external-helpers']

export default {
  input: 'src/axios-resources.js',
  output: {
    file: 'dist/axios-resources.js',
    format: 'cjs',
  },
  plugins: [
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [
        ['env', {
          targets: {
            browsers: ['chrome >= 50', 'ie >= 8']
          },
          modules: false
        }],
        'stage-0'
      ],
      plugins: babelPlugins
    }),
    resolve(),
    commonjs(),
    uglify(),
    json()
  ],
  external: [
    'axios'
  ],
};

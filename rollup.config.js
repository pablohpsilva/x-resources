// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';

export default {
  input: 'src/axios-resources.js',
  output: {
    file: 'dist/axios-resources.js',
    format: 'cjs',
  },
  plugins: [
    resolve(),
    commonjs(),
    json(),
  ],
  external: [
    'axios'
  ],
};

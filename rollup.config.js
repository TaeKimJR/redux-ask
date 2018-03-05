import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    name: 'ReduxAsk',
    file: 'dist/index.js',
    format: 'cjs',
  },
  plugins: [
    babel({})
  ],
};

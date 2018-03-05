import babel from 'rollup-plugin-babel';
// import uglify from 'rollup-plugin-uglify';

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

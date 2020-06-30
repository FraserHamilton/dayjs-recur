// rollup.config.js
export default {
  input: './index.js',
  output: {
    file: './build/index.js',
    format: 'umd',
    name: 'recur',
  },
  external: ['dayjs/plugin/utc', 'dayjs/plugin/weekOfYear'],
}

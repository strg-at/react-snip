import typescript from "rollup-plugin-typescript2";
import { uglify } from "rollup-plugin-uglify";
import dts from "rollup-plugin-dts";
import pkg from "./package.json";

const input = "src/index.ts";
const external = ['react']

export default [
  {
    input,
    output: {
      file: pkg.module,
      format: "esm",
    },
    plugins: [typescript({ typescript: require("typescript") }), uglify()],
    external
  },
  {
    input,
    output: {
      file: pkg.main,
      format: "umd",
      name: 'ReactSnip'
    },
    plugins: [typescript({ typescript: require("typescript") }), uglify()],
    external
  },
  {
    input,
    output: {
      file: "dist/index.d.ts",
      format: "esm"
    },
    plugins: [dts()],
    external
  },
];

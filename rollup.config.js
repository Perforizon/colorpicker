import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import sass from "rollup-plugin-sass";
import commonjs from "rollup-plugin-commonjs";
import copy from "rollup-plugin-copy";

import packageJson from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      dir: "./build",
      format: "es",
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    sass({
      insert: true
    })
  ]
};

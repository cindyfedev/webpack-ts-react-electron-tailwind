import type IForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import webpack from "webpack";
import dotenv from "dotenv";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: "webpack-infrastructure",
  }),
  // or DefinePlugin
  new webpack.DefinePlugin({
    "process.env.WOO_HOO": JSON.stringify(process.env.WOO_HOO),
    ...dotenv.config().parsed, // --> add this line should work
  }),
];

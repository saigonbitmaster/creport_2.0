const webpack = require("webpack");
const buffer = require.resolve("buffer/");

const buffers = ["buffer", "Buffer"];
const wasmRegExp = /\.wasm$/;
const wasmExps = {
  layers: true,
  asyncWebAssembly: false,
  lazyCompilation: true,
  syncWebAssembly: true,
  topLevelAwait: true,
};

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.extensions.push(".wasm");
      webpackConfig.experiments = wasmExps;
      webpackConfig.resolve.fallback = {
        buffer: buffer,
      };
      
      webpackConfig.module.rules.forEach((rule) => {
        rule.oneOf?.length
          ? rule.oneOf.forEach((oneOf) => {
              oneOf.type === "asset/resource"
                ? oneOf.exclude.push(wasmRegExp)
                : null;
            })
          : null;
      });
      webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
          Buffer: buffers,
        })
      );

      return webpackConfig;
    },
  },
};

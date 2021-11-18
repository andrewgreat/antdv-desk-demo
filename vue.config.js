const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const vueConfig = {
  chainWebpack: (config) => {
    config.resolve.alias.set("@$", resolve("src"));
  },

  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  runtimeCompiler: true,
};

module.exports = vueConfig;

const path = require("path");
const AntDesignThemePlugin = require("antd-theme-webpack-plugin");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const options = {
  antDir: path.join(__dirname, "./node_modules/ant-design-vue"), //antd包位置
  stylesDir: path.join(__dirname, "./src"), //主题文件所在文件夹
  varFile: path.join(
    __dirname,
    "./node_modules/ant-design-vue/lib/style/themes/default.less"
  ), // 自定义默认的主题色
  mainLessFile: "", // 项目中其他自定义的样式&#xff08;如果不需要动态修改其他样式&#xff0c;该文件可以为空&#xff09;
  outputFilePath: "", //提取的less文件输出到什么地方
  themeVariables: ["@primary-color"], //要改变的主题变量
  // indexFileName: "./public/index.html", // index.html所在位置
  generateOnce: false, // 是否只生成一次
};

const themePlugin = new AntDesignThemePlugin(options);

const vueConfig = {
  css: {
    loaderOptions: {
      less: {
        modifyvars: {
          "primary-color": "#108e66",
        },
        javascriptEnabled: true,
      },
    },
  },

  configureWebpack: {
    plugins: [themePlugin],
  },

  chainWebpack: (config) => {
    config.resolve.alias.set("@$", resolve("src"));

    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule.use("vue-svg-loader").loader("vue-svg-loader");
  },

  devServer: {
    //proxy:{'/api':{}},代理器中设置/api,项目中请求路径为/api的替换为target
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8080", //代理地址，这里设置的地址会代替axios中设置的baseURL
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        //ws: true, // proxy websockets
        //pathRewrite方法重写url
        // pathRewrite: {
        //   "^/api": "/"
        //   //pathRewrite: {'^/api': '/'} 重写之后url为 http://localhost:3000/xxxx
        //   //pathRewrite: {'^/api': '/api'} 重写之后url为 http://localhost:3000/api/xxxx
        // }
        bypass: function (req, res) {
          if (req.headers.accept.indexOf("html") !== -1) {
            console.log("Skipping proxy for browser request.");
            return "/index.html";
          } else {
            const name = (req.path || "")
              .split("/api/")[1]
              .split("/")
              .join("_");
            const mock = require(`./mock/${name}`);
            const result = mock(req.method);
            delete require.cache[require.resolve(`./mock/${name}`)];
            return res.send(result);
          }
        },
      },
    },
  },
};

module.exports = vueConfig;

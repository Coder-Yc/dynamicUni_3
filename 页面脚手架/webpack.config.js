const path = require("path");
const webpack = require("webpack");

module.exports = {
    target: ["web", "es5"],
    devtool: "cheap-module-source-map",
    entry: "./dist/index.js", // 这种配置打包后的JS文件会放在一个文件里
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "babel-preset-env",
                                {
                                    modules: false,
                                    targets: {
                                        chrome: "73",
                                        node: "14",
                                        browser: ["> 1%"],
                                    },
                                },
                            ],
                        ],
                    },
                },
            },
        ],
    },

    mode: "development",
};

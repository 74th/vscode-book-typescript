const path = require('path');

let exclude = [path.resolve(__dirname, "public")];

module.exports = {
    entry: './src/frontend/index.ts',
    mode: "development",
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".js"],
        alias: {
            'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' webpack 1 用
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                exclude
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",
                exclude
            }
        ]
    },
    devServer: {
        contentBase: "public/html/"
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, "./public/html/js"),
    },
};

const webpack = require("webpack");
module.exports = {
    devServer: {
        port: 8080,     // 端口号
    },
    configureWebpack: {
        //支持jquery
        plugins: [
            new webpack.ProvidePlugin({
                $:"jquery",
                jQuery:"jquery",
                "windows.jQuery":"jquery"
            })
        ]
    },
};
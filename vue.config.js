module.exports = {
    lintOnSave:false,
    devServer: {
        //跨域代理 只在本地开发是起作用，上线的时候这里的配置没用
        proxy:'http://localhost:8000'
    }
}
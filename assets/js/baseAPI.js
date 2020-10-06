// jquery提供的ajaxPrefilter函数在每次发起请求前都会自动调用
//可以在这时候拼接上根路径,便于管理
$.ajaxPrefilter(function(options) {
    //请求根路径
    const URL = 'http://ajax.frontend.itheima.net'
    options.url = URL + options.url
})
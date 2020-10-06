// jquery提供的ajaxPrefilter函数在每次发起请求前都会自动调用
//可以在这时候拼接上根路径,便于管理
$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url

    // 为有权限的接口，设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: sessionStorage.getItem('token') || ''
        }
    }

    //优化complate
    options.complete = function(res) {
        //使用 res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
          layer.msg('钥匙都不拿就想进门,不存在的!');
          //  强制清空 token
          sessionStorage.removeItem('token')
          //  强制跳转到登录页面
          location.href = '/login.html'
          
        }
      }
})
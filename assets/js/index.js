$(function () {

    //调用获取用户信息
    getUserInfo()

    var layer = layui.layer;

    // 点击退出按钮
    $('#btnLogout').on('click', function() {
      layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
        //清空本地存储中的 token
        sessionStorage.removeItem('token')
        //重新跳转到登录页面
        location.href = '/login.html'
  
        // 关闭 confirm 询问框
        layer.close(index)
      })
    })
  
})

//获取用户信息
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: sessionStorage.getItem('token') || ''
        // },
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败o(╥﹏╥)o');
            }
            //调用自己封装的渲染头像函数
            renderAvatar(res.data)
        }
    })
}

//渲染用户头像
function renderAvatar(user) {
    //  获取用户的名称
    var name = user.nickname || user.username
    //  设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //  按需求渲染用户的头像
    if (user.user_pic !== null) {
        //  渲染图片头像
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
        $('.text-avatar').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar')
            .html(first)
            .show()
    }

}
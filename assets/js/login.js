$(function () {
    //点击去注册的链接
    $('#login_btn').on('click', function () {
        $('.login').show()
        $('.reg').hide()
    })

    //点击去登录的链接
    $('#reg_btn').on('click', function () {
        $('.login').hide()
        $('.reg').show()
    })

    //表单预验证
    //从layui获取form对象
    var form = layui.form
    //通过form.verify()函数自定义校验规则
    form.verify({
        //自定义了一个psd验证规则
        psd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repsd: function (value) {  //value是再次确认密码框中的内容
            //拿到确认密码框的内容 相比较
            var psd = $('.reg [name=password]').val()
            if (psd !== value) {
                return '两次密码不一致';
            }
        }
    })


    
    //监听注册版块的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        var username = $('#form_reg [name=username]').val().trim()
        var password = $('#form_reg [name=password]').val().trim()
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: username,
                password: password,
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功! 请登录(*￣︶￣)')
                $('#login_btn').click()
            }
        })
    })

    //监听登录版块的提交事件
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url:'/api/login',
            data:$(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('o(╥﹏╥)o登陆失败')
                }
                //将token 保存到本地
                sessionStorage.setItem('token', res.token)
                layer.msg('ε＝ε＝ε＝(#>д<)ﾉ啊!他进来啦')
                location.href = '/index.html'
            }
        })
    })

})
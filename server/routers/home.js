
const User = require('../model/userModel')

const callbackHome = async ctx => {
    let account = ctx.query.account
    let password = ctx.query.password
    let _user = new User({
        account: account,
        password: password
    })
    let userSave = function () {
        return new Promise(async (resove, reject) => {
            if (!await User.findOne({ account: account}).exec()) {
                _user.save(function (err, res) {
                    if (err) return reject(err);
                    // saved!
                    resove({
                        code: 0,
                        data: {id: res.id},
                        msg: '注册成功'
                    })
                }) 
            } else {
                resove({
                    code: -1,
                    data: -1,
                    msg: '用户名已存在'
                })
            }
        })
    }
    ctx.body = await userSave()
}

const callbackLogin = async ctx => {
    let account = ctx.request.body.account || ''
    let password = ctx.request.body.password || ''
    if (!account || !password) {
        ctx.body = {
            code: -1,
            data: -1,
            msg: '账号密码不能为空'
        }
        return
    }
    let _user = await User.findOne({ account: account}).exec()
    if (!_user) {
        ctx.body = {
            code: -1,
            data: -1,
            msg: '用户不存在'
        }
        return
    }
    if (_user.password == password) {
        ctx.body = {
            code: 0,
            data: {
                id: _user.id,
                account: account
            },
            msg: '登录成功'
        }
    } else {
        ctx.body = {
            code: -1,
            data: -1,
            msg: '密码错误'
        }
    }
}

module.exports = [
    {
        method: 'GET',
        path: '/api/signup',
        cbFnc: callbackHome
    },
    {
        method: 'POST',
        path: '/api/login',
        cbFnc: callbackLogin
    }
]
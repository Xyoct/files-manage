
const User = require('../model/models').UserModel
const  { ResBodySuccess, ResBodyFail } = require('../util')

const callbackSignup = async ctx => {
    let account = ctx.query.account
    let password = ctx.query.password
    let _user = new User({
        account: account,
        password: password
    })
    if (!account) {
        return ctx.body = new ResBodyFail('账号不能为空！')
    }
    if (!password) {
        return ctx.body = new ResBodyFail('密码不能为空！')
    }
    let userSave = function () {
        return new Promise(async (resove, reject) => {
            if (!await User.findOne({ account: account}).exec()) {
                _user.save(function (err, res) {
                    if (err) return reject(err);
                    // saved!
                    resove(new ResBodySuccess('注册成功！', {id: res.id}))
                }) 
            } else {
                resove(new ResBodyFail('用户名已存在！'))
            }
        })
    }
    ctx.body = await userSave()
}

const callbackLogin = async ctx => {
    let account = ctx.request.body.account || ''
    let password = ctx.request.body.password || ''
    if (!account || !password) {
        return ctx.body = new ResBodyFail('账号密码不能为空！')
    }
    let _user = await User.findOne({ account: account}).exec()
    if (!_user) {
        return ctx.body = new ResBodyFail('用户不存在！')
    }
    if (_user.password == password) {
        return new ResBodySuccess('登录成功！', {
            token: `${_user.id}|${account}`,
            account: account
        })
    } else {
        return ctx.body = new ResBodyFail('密码错误！')
    }
}

module.exports = [
    {
        method: 'GET',
        path: '/api/signup',
        cbFnc: callbackSignup
    },
    {
        method: 'POST',
        path: '/api/login',
        cbFnc: callbackLogin
    }
]
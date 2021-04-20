
const User = require('../model/userModel')

const callbackHome = async ctx => {
    let account = ctx.query.account
    let password = ctx.query.password
    let _user = new User({
        account: account,
        password: password
    })
    let userSave = function () {
        return new Promise((resove, reject) => {
            _user.save(
                function (err, res) {
                    if (err) return reject(err);
                    // saved!
                    resove(res)
                }
            ) 
        })
    }
    ctx.body = await userSave()
}

module.exports = [
    {
        method: 'GET',
        path: '/save',
        cbFnc: callbackHome
    }
]
const path = require('path')
const fs = require('fs')
const send = require('koa-send')
var contentDisposition = require('content-disposition')

const callbackFilesDownload = async ctx => {
    let fileName = ctx.query.fileName
    let filePath = ctx.query.filePath
    let files = filePath + fileName
    let __path = path.join(__dirname, '../files' + files)
    let _bodyFnc = function() {
        return new Promise((resolve, reject) => {
            if (fs.existsSync(__path)) {
                resolve(fs.readFileSync(__path))
            } else {
                resolve(false)
            }
        })
    }
    if (await _bodyFnc()) {
        ctx.set('Content-type', 'application/*')
        ctx.set('Content-Disposition', contentDisposition(__path))
        ctx.body = await _bodyFnc()
    } else {
        ctx.body = {
            code: -1,
            msg: '文件不存在',
            data: -1
        };
    }

}

module.exports = [
    {
        method: 'GET',
        path: '/download',
        cbFnc: callbackFilesDownload
    }
]
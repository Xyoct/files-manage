const path = require('path')
const fs = require('fs')
var contentDisposition = require('content-disposition')

const FileInfo = require('../model/models').FileInfoModel

const  { ResBodySuccess, ResBodyFail } = require('../util')

const callbackFilesDownload = async ctx => {
    let fileName = ctx.query.fileName
    let filePath = ctx.query.filePath
    let files = filePath + fileName
    let __path = path.join(__dirname, '..' + files)
    let _bodyFnc = function () {
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
        return ctx.body = await _bodyFnc()
    } else {
        return ctx.body = new ResBodyFail('文件不存在')
    }

}

const callbackFilesUpload = async ctx => {
    // 上传单个文件
    const file = ctx.request.files.file; // 获取上传文件
    if (!file) {
        return ctx.body = new ResBodyFail('未获取到文件！')
    }
    let token = ctx.headers.token || ''
    if (!token) {
        return ctx.body = new ResBodyFail('上传文件请先登录！')
    } else {
       let _userId =  token.split('|')[0]
       let _userName =  token.split('|')[1]
       let _path = path.join(__dirname, `../files/${_userId}/`)
       if (fs.existsSync(_path)) {
            // console.log('该路径已存在');
        } else {
            fs.mkdirSync(_path)
        }
        let filePath = _path + `/${file.name}`;
        if (fs.existsSync(filePath)) {
            return ctx.body = new ResBodyFail('文件已存在！')
        }
        let _fileInfo = new FileInfo({
            uploadUserName: _userName,
            uploadUserId: _userId,
            fileName: file.name,
            dir: `/files/${_userId}/`,
        })
        let fileInfoSave = function () {
            return new Promise(async (resove, reject) => {
                _fileInfo.save(function (err, res) {
                    if (err) return reject(false);
                    // saved!
                    resove(true)
                }) 
            })
        }
        if (await fileInfoSave()) {
            
            try {
                // 创建可读流
                const reader = fs.createReadStream(file.path);
                // 创建可写流
                const upStream = fs.createWriteStream(filePath);
                // 可读流通过管道写入可写流
                reader.pipe(upStream);
        
                return ctx.body = new ResBodySuccess('上传成功！')
            } catch (err) {
                return ctx.body = new ResBodyFail('文件存储失败！')
            }
        } else {
            return ctx.body = new ResBodyFail('入库失败！')
        }
    }
}

const callbackFileList = async ctx => {
    
    let keyWord = ctx.request.query.keyWord || ''
    let reg = new RegExp(keyWord, 'i') //不区分大小写
    let queryConfig = {
        $or : [ //多条件，数组
            {uploadUserName : {$regex : reg}},
            {fileName : {$regex : reg}}
        ]
    }
    let result = await FileInfo.find(queryConfig).sort({date: -1})
    let pageSize = ctx.request.query.pageSize*1 || 15
    let pageNum = ctx.request.query.pageNum*1 || 1
    let _result = result.slice((pageNum - 1)*pageSize, pageSize*pageNum)
    return ctx.body = new ResBodySuccess('成功！', {
        total: result.length,
        fileList: _result
    })
}


async function del(fileId) {
    return new Promise((resolve, reject) => {
        FileInfo.findByIdAndDelete({_id: fileId}, {}, (err, res) => {
            if (err) reject(false)
            resolve(res)
        })
    })
}


const callbackFileDel = async ctx => {
    
    let token = ctx.headers.token || ''
    let _userId = token.split('|')[0]
    let fileId = ctx.request.query.fileId || ''
    let result = await FileInfo.findById(fileId)
    if (result.uploadUserId == _userId) {
        let _result = await del(fileId)
        let _path = path.join(__dirname, `../${result.dir}/${result.fileName}`)
        fs.unlinkSync(_path)
        if (_result) {
            return ctx.body = new ResBodySuccess('删除成功！')
        } else {
            return  ctx.body = new ResBodyFail('删除失败！')
        }
    } else {
        return ctx.body = new ResBodyFail('不能删除非自己上传的文件')
    }
}

module.exports = [
    {
        method: 'GET',
        path: '/api/download',
        cbFnc: callbackFilesDownload
    },
    {
        method: 'POST',
        path: '/api/upload-file',
        cbFnc: callbackFilesUpload
    },
    {
        method: 'GET',
        path: '/api/file-list',
        cbFnc: callbackFileList
    },
    {
        method: 'DELETE',
        path: '/api/file-del',
        cbFnc: callbackFileDel
    },
]
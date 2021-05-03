const mongoose = require('mongoose')
const userSchema = require('../schema/schemas').userSchema
const fileInfoSchema = require('../schema/schemas').fileInfoSchema

const User = mongoose.model('User', userSchema);
const FileInfo = mongoose.model('FileInfo', fileInfoSchema);

module.exports = {
    UserModel: User,
    FileInfoModel: FileInfo
}
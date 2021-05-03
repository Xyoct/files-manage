const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    account:  String, // String is shorthand for {type: String}
    password: String,
    date: { type: Date, default: Date.now }
});

const fileInfoSchema = new mongoose.Schema({
    uploadUserName:  String, // String is shorthand for {type: String}
    uploadUserId:  String, // String is shorthand for {type: String}
    fileName: String,
    dir: String,
    date: { type: Date, default: Date.now }
});

module.exports = {
    userSchema: userSchema,
    fileInfoSchema: fileInfoSchema
}
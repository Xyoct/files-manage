const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    account:  String, // String is shorthand for {type: String}
    password: String,
    date: { type: Date, default: Date.now }
});

module.exports = userSchema
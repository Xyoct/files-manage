const mongoose = require('mongoose')

mongoose.connection.on('error', function (err) {
    console.log(err)
});
mongoose.connection.on('connected', function () {
    console.log('mongodb connect success!!!')
});
mongoose.connection.on('disconnected', () => {
    console.log('mongodb disconnected success!!!')
})

module.exports = mongoose
const log4js = require("log4js");
log4js.configure({
    appenders: {
        access: { type: "dateFile", filename: "./server/logs/access/access.log","pattern": "-yyyy-MM-dd"},
        errLog: { type: "dateFile", filename: "./server/logs/error/error.log","pattern": "-yyyy-MM-dd", categories: 'errLog'}
    },
    categories: {
        default: { appenders: ["access"], level: "debug" },
        errLog: { appenders: ["errLog"], level: "error" },

    }
});


var logger = log4js.getLogger('access');
var loggerErr = log4js.getLogger('errLog');

module.exports = {
    logger: logger,
    loggerErr: loggerErr
}
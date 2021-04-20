const path = require('path')
const Koa = require('koa')
const static = require('koa-static')
const views = require('koa-views')
const cors = require('koa2-cors')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const { port, dbUrl, corsConfig} = require('./config')
const viewsH = require('../views/index')
const controller = require('./middleware/controller')

const db = require('./db')
db.connect(dbUrl, { useNewUrlParser: true })

const {logger, loggerErr} = require("./logs");
const {formatRequestLogText, formatResponseLogText} = require("./util");


app.use(async (ctx, next) => {
    try {
        logger.info(formatRequestLogText(ctx));
        await next()
        logger.info(formatResponseLogText(ctx));
    } catch (err) {
        loggerErr.error(err);
    }
})

app.use(bodyParser())

app.use(static(path.join(__dirname, '../public')))
app.use(views(path.join(__dirname, '../views'), viewsH))

app.use(controller())
app.use(cors(corsConfig))
app.use(router.routes())

app.listen(port)
console.log(`.......................`)
console.log(`app listen at ${port}`)
console.log(``)

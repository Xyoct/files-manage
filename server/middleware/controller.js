const fs = require('fs')
const path = require('path')
const router = require('koa-router')()

function addControllers(router) {
    let files = fs.readdirSync(path.join(__dirname, '../routers'))
    let js_files = files.filter((f) => {
        return f.endsWith('.js')
    })

    for (let f of js_files) {
        console.log(``)
        console.log(`process controller: ${f}`)
        let mapping = require(path.join(__dirname, '../routers/' + f))
        mapping.forEach(item => {
            addMapping(router, item)
        });
    }
}

function addMapping(router, route) {
    switch (route.method) {
        case 'GET':
            router.get(route.path, route.cbFnc)
            console.log(`  router mapping: ${route.method} ${route.path}`)
            break;
            case 'POST':
            router.post(route.path, route.cbFnc)
            console.log(`  router mapping: ${route.method} ${route.path}`)
            break;
    }
}

const controller = () => {
    addControllers(router)
    return router.routes()
}

module.exports = controller

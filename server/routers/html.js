const staticPath = process.env.NODE_ENV === "production"? 'http://www.bestlifebestyue.com/file-manage': ''

const callbackIndex = async ctx => {    
    await ctx.render('home', {
        title: "website",
        name: "World",
        user: 'sessionUser',
        css: ['/css/index.css'].map( e => {
            return staticPath + e
        }),
        js: [].map( e => {
            return staticPath + e
        })
        
    })
}

module.exports = [
    {
        method: 'GET',
        path: '/',
        cbFnc: callbackIndex
    }
]
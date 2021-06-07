const staticPath = process.env.NODE_ENV === "production"? 'http://www.bestlifebestyue.com/file-manage': ''

const callbackIndex = async ctx => {    
    await ctx.render('home', {
        title: "南山小居",
        name: "望舒",
        selfDesc: '小前端一枚',
        menus: [
            {id: 'self',name: '自我介绍'},
            {id: 'gallery',name: '作品集合'},
            {id: 'contact',name: '联系一下'}
        ],
        icons: ['wechat', 'qq', 'mail'],
        user: 'sessionUser',
        css: ['/css/iconfont.css', '/css/index.css'].map( e => {
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
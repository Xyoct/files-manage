const staticPath = process.env.NODE_ENV === "production"? 'http://www.bestlifebestyue.com/file-manage': ''

const callbackIndex = async ctx => {    
    await ctx.render('home', {
        title: "南山小居",
        name: "望舒",
        selfDesc: '小前端一枚',
        menus: [
            {id: 'self', _id: '#self', name: '自我介绍'},
            {id: 'gallery', _id: '#gallery',name: '作品集合'},
            {id: 'contact', _id: '#contact',name: '联系一下'}
        ],
        icons: ['wechat', 'qq', 'mail'],
        galleryImgList: [
            {
                title: '作品一',
                desc: '/img/gallery/1.jpeg',
                imgUrl: '/img/gallery/1.jpeg',
                url: 'http://www.baidu.com',
            },
            {
                title: '作品二',
                desc: '你的',
                imgUrl: '/img/gallery/2.jpeg',
                url: 'http://www.baidu.com',
            },
            {
                title: '作品三',
                desc: '/img/gallery/3.jpeg',
                imgUrl: '/img/gallery/3.jpeg',
                url: 'http://www.baidu.com',
            },
            {
                title: '作品四',
                desc: '/img/gallery/4.jpeg',
                imgUrl: '/img/gallery/4.jpeg',
                url: 'http://www.baidu.com',
            }
        ].map( e => {
            return {
                title: e.title,
                desc: e.desc,
                imgUrl: staticPath + e.imgUrl,
                url: e.url
            }
        }),
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
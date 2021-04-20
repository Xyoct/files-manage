
const formatCookie = function (cookie) {
	let cookieArr = cookie? cookie.split('; '): []
	let cookieObj = {}
	cookieArr.forEach(item => {
		let itemArr = item.split('=')
		cookieObj[itemArr[0]] = itemArr[1]
	});
	return cookieObj
}

function formatRequestLogText(ctx) {
    let _str = `${ctx.request.method} ${ctx.request.url}`
    return _str
}

function formatResponseLogText(ctx) {
    let _str = `${ctx.request.method} ${ctx.request.url} ${ctx.response.status} ${ctx.response.message}`
    return _str
}

function ResBodySuccess(data) {
    this.code = '000000'
    this.msg = '成功'
    this.data = data || 1
}
function ResBodyFail(err) {
    this.code = '666'
    this.msg = err || '失败'
    this.data = 0
}

module.exports = {
    formatCookie: formatCookie,
    ResBodySuccess: ResBodySuccess,
    ResBodyFail: ResBodyFail,
    formatRequestLogText: formatRequestLogText,
    formatResponseLogText: formatResponseLogText
}
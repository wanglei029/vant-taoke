const md5 = require('md5')
// 新增输入参数：

// Nonce：一个6位的随机数
function randomn (n) {
  if (n > 21) return null
  return parseInt((Math.random() + 1) * Math.pow(10, n - 1))
}
const nonce = randomn(6)
// console.log(nonce)

// Timer：毫秒级时间戳
const timer = new Date().getTime()
// console.log(timer)
// 验签步骤：
const appSecret = 'fbd96b5305266ee2a1ace48763d14178'// 应用的Secret
// const version = 'v1.2.0' // API接口版本号
const appKey = '5da24dcbcde8b'// 应用分配的appKey
// 1、将当前应用的appkey，appsecret，nonce参数和timer参数进行组装，
// 拼接成字符串：appKey=xxx&timer=xxx&nonce=xxx&key=xxx （key对应appsecret）
const str = `appKey=${appKey}&timer=${timer}&nonce=${nonce}&key=${appSecret}`
// 2、将刚才拼接的字符串进行md5加密并将加密结果转成大写
const signRan = md5(str).toLocaleUpperCase()
// 3、将即将请求的接口的参数进行拼接，并将刚才生成的md5加密结果拼接至请求链接中，然后发送请求。
// console.log(signRan)
export default signRan
// 示例：

// 请求商品列表接口：

// https://openapi.dataoke.com/api/goods/get-goods-list?appKey=5da24dcbcde8b&nonce=597632&pageId=1&pageSize=200&signRan=BDEBE0C6BBA9BB968995AF7974C072BC&timer=1589253503659&version=v1.2.0&

//  注：新验签方式md5加密结果须命名为signRan

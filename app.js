// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()
// 定义验证规则的包
const joi = require('joi')
// 导入全局配置文件
const config = require('./config')

// 导入并配置 cors 中间件
const cors = require('cors')
app.use(cors())

// 托管静态资源文件
app.use(express.static('./uploads'))

// 配置解析表单数据的中间件
// 注意: 这个中间件,只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false}))

// 响应数据的中间件
app.use((req, res, enxt) => {
  res.cc = (err, status = 1) => {
    res.send({
      status,
      // instanceof 判断 err 是否为 Error 的实例对象或 Error 子类的示例对象
      message: err instanceof Error ? err.message : err
    })
  }
  enxt()
})

// 解析 Token 的中间件
// const { expressjwt } = require('express-jwt')
const expressjwt = require('express-jwt')
app.use(expressjwt({
  secret: config.jwtSecretKey,
  algorithms: ["HS256"],
}).unless({ path: [/^\/api\//] })) // 指定哪些接口不需要进行 Token 的身份认证

// 导入并注册路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)
const userinfo = require('./router/userinfo')
app.use('/my', userinfo)
const artcate = require('./router/artcate')
app.use('/my/article', artcate)
const article = require('./router/article')
app.use('/my/article', article)

// 错误级别中间件
app.use((err, req, res, next) => {
  // Joi 参数校验失败
  if (err instanceof joi.ValidationError) return res.cc(err)
  // token 解析失败  
  if (err.name === 'UnauthorizedError') return res.cc('token无效')
  // 未知错误
  res.cc(err)
})

// 调用 app.listen 方法 指定端口号并启动 web 服务器
app.listen(3007, () => {
  console.log('app server running at http://127.0.0.1:3007');
})

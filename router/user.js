const express = require('express')
const router = express.Router()

// 导入用户路由处理函数模块
const userHandler  = require('../router_handler/user')

// 1. 导入表单验证数据的中间件 来自动对表单进行验证
const expressJoi = require('@escook/express-joi')
// 2. 导入需要验证的规则对象
const { regLoginSchema } = require('../schema/user')

// 注册新用户
// 3. 在注册新用户的路由中，声明局部中间件，对当前请求中携带的数据进行验证
//    3.1 数据验证通过后，会把这次请求流转给后面的路由函数
//    3.2 数据验证失败后，终止后续代码的指向，并抛出一个全局的Error错误，进入全局错误级别中间件中
router.post('/reguser', expressJoi(regLoginSchema), userHandler.regUser)
// 登录
router.post('/login', expressJoi(regLoginSchema), userHandler.login)

module.exports = router

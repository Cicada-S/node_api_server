const express = require('express')
const router = express.Router()

const userinfoRouter = require('../router_handler/userinfo')

// 1. 导入表单验证的中间件 
const expressJoi = require('@escook/express-joi')
// 2. 导入需要验证的规则对象
const { updateUserInfoSchema, updatePasswordSchema } = require('../schema/user')

// 获取用户信息
router.get('/userinfo', userinfoRouter.getUserInfo)
// 更新用户信息
router.post('/userinfo', expressJoi(updateUserInfoSchema), userinfoRouter.updateUserInfo)
// 修改用户密码
router.post('/updatepwd', expressJoi(updatePasswordSchema), userinfoRouter.updatePassword)

module.exports = router

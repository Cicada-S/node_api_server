// 定义验证规则的包
const joi = require('joi')

// 校验 req.body 中的数据
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

// 定义 id nickname email 的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

// 验证规则对象 - 注册和登录
exports.regLoginSchema = {
  body: {
    username,
    password
  }
}

// 验证规则对象 - 更新用户信息
exports.updateUserInfoSchema = {
  body: {
    id,
    nickname,
    email
  }
}

// 验证规则对象 - 修改用户密码
exports.updatePasswordSchema = {
  body: {
    // 使用 password 这个规则，验证 req.body.oldPwd 的值
    oldPwd: password,
    // 使用 joi.not(joi.ref('oldPwd')).concat(password) 规则，验证 req.body.newPwd 的值
    // 解读：
    // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
    // 翻译：新密码(newPwd) 必须等于 旧密码(oldPwd) 才能进行下一步
    // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
    // 翻译：要修改新密码(newPwd) 不能等于旧密码 
    // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
    // 翻译：符合以上要求 然后再通过 password 规则验证即可
    newPwd: joi.not(joi.ref('oldPwd')).concat(password)
  }
}

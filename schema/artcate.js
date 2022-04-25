// 定义验证规则的包
const joi = require('joi')

// 定义 文章name和alias 的验证规则
const name = joi.string().required()
const alias = joi.string().alphanum().required()

// 定义 分类Id 的校验规则
const id = joi.number().integer().min(1).required()

// 验证规则对象 - 新增文章分类 
exports.addCateSchema = {
  body: {
    name,
    alias
  }
}

// 验证规则对象 - 删除文章分类
exports.deleteCateSchema = {
  body: {
    id
  }
}

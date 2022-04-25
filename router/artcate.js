const express = require('express')
const router = express.Router()

const artcateHandler = require('../router_handler/artcate')
// 验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 需要验证数据的规则对象
const { addCateSchema, deleteCateSchema } = require('../schema/artcate')

// 获取文章分类列表的路由
router.get('/cates', artcateHandler.getArtcate)
// 新增文章分类的路由
router.post('/addcates', expressJoi(addCateSchema), artcateHandler.addArticleCates)
// 删除文章分类的路由
router.get('/deletecate/:id', expressJoi(deleteCateSchema), artcateHandler.deleteCateById)

module.exports = router

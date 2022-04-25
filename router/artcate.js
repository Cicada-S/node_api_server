const express = require('express')
const router = express.Router()

const artcateHandler = require('../router_handler/artcate')

// 获取文章分类列表的路由
router.get('/cates', artcateHandler.getArtcate)

module.exports = router

const path = require('path');
const db = require('../db');

// 发布新文章的处理函数
exports.addArticle = (req, res) => {
  // 判断用户是否上传了 封面图片(cover_img) 
  if(!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数！')
  // 文章数据对象
  const articleInfo = {
    // 标题、内容、状态、所属的分类Id
    ...req.body,
    // 文章封面在服务器端的存放路径
    cover_img: path.join(__dirname, req.file.fieldname),
    // 文章发布时间
    pub_date: new Date(),
    // 文章作者的Id
    author_id: req.user.id
  }
  // 发布文章
  const sql = 'insert into ev_articles set ?'
  db.query(sql, articleInfo, (err, results) => {
    if(err) return res.cc(err)
    if(results.affectedRows !== 1) return res.cc('发布文章失败!')
    res.cc('发布文章成功!', 0)
  })
}

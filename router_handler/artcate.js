const db = require("../db/index")

// 获取文章分类列表的处理函数
exports.getArtcate = (req, res) => {
  // order by id asc 升序排序
  const sql = 'select * from ev_article_cate where is_delete = 0 order by id asc'
  db.query(sql, (err, results) => {
    if(err) return res.cc(err)
    console.log(results);
    if(results.length === 0) return res.cc('获取文章分类列表失败!')
    res.send({
      status: 0,
      message: '获取文章分类列表成功!',
      data: results
    })
  })
}

const db = require("../db/index")

// 获取文章分类列表的处理函数
exports.getArtcate = (req, res) => {
  // order by id asc 升序排序
  const sql = 'select * from ev_article_cate where is_delete = 0 order by id asc'
  db.query(sql, (err, results) => {
    if(err) return res.cc(err)
    if(results.length === 0) return res.cc('获取文章分类列表失败!')
    res.send({
      status: 0,
      message: '获取文章分类列表成功!',
      data: results
    })
  })
}

// 新增文章分类的处理函数
exports.addArticleCates = (req, res) => {
  // 查询 分类名称 与 分类别名 是否被占用
  const sql = 'select * from ev_article_cate where name = ? or alias = ?'
  db.query(sql, [req.body.name, req.body.alias], (err, results) => {
    if(err) return res.cc(err)
    // 分类名称 与 分类别名 都别占用
    if(results.length === 2) return res.cc('分类名称与别名都已存在!')
    if(
      results.length === 1 
      && results[0].name === req.body.name 
      && results[0].alias === req.body.alias
    ) return res.cc('分类名称和别名都已存在!')
    // 分类名称 或 分类别名 别占用
    if(results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称已存在!')
    if(results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名已存在!')
    // 分类名称 与 分类别名 未被占用
    const sql = 'insert into ev_article_cate set ?'
    db.query(sql, req.body, (err, results) => {
      if(err) return res.cc(err)
      if(results.affectedRows !== 1) return res.cc('新增文章分类失败!')
      res.cc('新增文章分类成功!', 0)
    })
  })
}

// 删除文章分类的处理函数
exports.deleteCateById = (req, res) => {
  const sql = 'update ev_article_cate set is_delete = 1 where Id = ?'
  db.query(sql, req.params.id, (err, results) => {
    if(err) return res.cc(err)
    if(results.affectedRows !== 1) return res.cc('删除文章分类失败!')
    res.cc('删除文章分类成功!', 0)
  })
}

// 获取文章分类数据的处理函数
exports.getArticleById = (req, res) => {
  const sql = 'select * from ev_article_cate where id = ?'
  db.query(sql, req.params.id, (err, results) => {
    if(err) return res.cc(err)
    if(results.length !== 1) return res.cc('获取文章分类数据失败!')
    res.send({
      status: 0,
      message: '获取文章分类数据成功!',
      data: results[0]
    })
  })
}

// 更新文章分类数据的处理函数
exports.updateArticleById = (req, res) => {
  // 分类名称 与 分类别名 是否被占用
  const sql = 'select * from ev_article_cate where Id <> ? and (name = ? or alias = ?)'
  db.query(sql, [req.body.Id, req.body.name, req.body.alias], (err, results) => {
    if(err) return res.cc(err)
    // 分类名称 与 分类别名 都别占用
    if(results.length === 2) return res.cc('分类名称与别名都已存在!')
    if(
      results.length === 1 
      && results[0].name === req.body.name 
      && results[0].alias === req.body.alias
    ) return res.cc('分类名称和别名都已存在!')
    // 分类名称 或 分类别名 别占用
    if(results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称已存在!')
    if(results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名已存在!')
    // 分类名称 与 分类别名 未被占用
    const sql = 'update ev_article_cate set ? where Id = ?'
    db.query(sql, [req.body, req.body.Id], (err, results) => {
      if(err) return res.cc(err)
      if(results.affectedRows !== 1) return res.cc(`未匹配到Id为${req.body.Id}的文章分类数据!`)
      res.cc('更新文章分类数据成功!', 0)
    })
  })
}

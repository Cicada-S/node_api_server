const db = require("../db/index")
// 导入 bcryptjs 用于对密码加解密
const bcrypt = require('bcryptjs')

// 获取用户信息的处理函数
exports.getUserInfo = (req, res) => {
  const sql = 'select id, username, nickname, email, user_pic from ev_users where id = ?'
  // req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件自动挂载上去的
  db.query(sql, req.user.id, (err, results) => {
    // sql 语句执行错误
    if(err) return res.cc(err)
    // 找不到改该用户
    if(results.length !== 1) return res.cc('获取用户信息失败!')
    // 获取用户信息成功
    res.send({
      status: 0,
      message: '获取用户数据成功!',
      data: results[0]
    })
  })  
}

// 更新用户信息的处理函数
exports.updateUserInfo = (req, res) => {
  const sql = 'update ev_users set ? where id = ?'
  db.query(sql, [req.body, req.body.id], (err, results) => {
    if(err) return res.cc(err)
    if(results.affectedRows !== 1) return res.cc('更新用户信息失败!')
    res.send({
      status: 0,
      message: '更新用户信息成功!',
      data: results[0]
    })
  })
}

// 修改用户密码的处理函数
exports.updatePassword = (req, res) => {
  // 判断用户是否存在
  const sql = 'select * from ev_users where id = ?'
  db.query(sql, req.user.id, (err, results) => {
    if(err) return res.cc(err)
    if(results.length !== 1) return res.cc('用户不存在!')
    // 用户存在 判断提交的旧密码是否正确
    const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
    if(!compareResult) return res.cc('旧密码错误!')
    // 旧密码正确 对新密码进行加密 然后存入数据库
    req.body.newPwd = bcrypt.hashSync(req.body.newPwd, 10)
    const sql = 'update ev_users set password = ? where id = ?'
    db.query(sql,[req.body.newPwd, req.user.id], (err, results) => {
      if(err) return res.cc(err)
      if(results.affectedRows !== 1) return res.cc('密码修改失败!')
      res.cc('密码修改成功!', 0)
    })
  })
}

// 更新用户头像的处理函数
exports.updateAvatar = (req, res) => {
  const sql = 'update ev_users set user_pic = ? where id = ?'
  db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
    if(err) return res.cc(err)
    if(results.affectedRows !== 1) return res.cc('更新用户头像失败!')
    res.send({
      status: 0,
      message: '更新用户头像成功!',
      data: results[0]
    })
  })
}

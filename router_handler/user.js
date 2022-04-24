// 导入数据库操作模块
const db = require('../db/index')
// 导入 bcryptjs 用于对密码加解密
const bcrypt = require('bcryptjs')
// 导入这个包用来生成 Token
const jwt = require('jsonwebtoken')
// 导入全局配置文件
const config = require('../config')

// 注册的处理函数
exports.regUser = (req, res) => {
  const userinfo = req.body
  // 判断数据是否合法
  if(!userinfo.username || !userinfo.password) return res.cc('用户名或密码不合法!')
  // 查询用户名是否被占用
  const sql = 'select * from ev_users where username=?'
  db.query(sql, userinfo.username, (err, results) => {
    if(err) return res.cc(err)
    if(results.length > 0) return res.cc('该用户名已存在!')
  })
  // 调用 bcrypt.hashSync() 对用户密码进行加密
  userinfo.password = bcrypt.hashSync(userinfo.password, 10)
  // 插入新用户
  const sqlAdd = 'insert into ev_users set ?'
  db.query(sqlAdd, {username: userinfo.username, password: userinfo.password}, (err, results) => {
    if(err) return res.cc(err)
    // 可以通过 affectedRows 属性来判断是否插入数据成功
    if(results.affectedRows !== 1)  res.cc('用户注册失败，请稍后再试!')
    res.cc('注册成功!', 0)
  })
}

// 登录的处理函数
exports.login = (req, res) => {
  const userinfo = req.body
  const sql = 'select * from ev_users where username = ?'
  db.query(sql, userinfo.username, (err, results) => {
    // 登录失败
    if(err) return res.cc(err)
    if(results.length !== 1) return res.cc('用户名错误!')
    // 拿用户输入的密码,和数据库中存储的密码进行对比
    const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
    if(!compareResult) return res.cc('密码错误!')
    // 登录成功
    // 剔除密码和头像的值
    const user = { ...results[0], password: '', user_pic: ''}
    // 对用户的信息进行加密 生成 Token 字符串
    const tokenStr = jwt.sign(
      user,
      config.jwtSecretKey,
      {expiresIn: config.expiresIn}
    )
    res.send({
      status: 0,
      message: '登录成功!',
      // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
      token: 'Bearer ' + tokenStr
    })
  })
}

const fs = require('fs')

module.exports = function(app) {
  // 订单详情
  app.get('/prod-order/company/order/queryOrder', (req, res) => {
    readFile(`./mock/json/${req.path.replace('/', '').replace(/\//g, '-').toLowerCase()}.json`, 'json')
      .then(data => res.json(data))
      .catch((err) => res.status(500).send(err.message))
  })

  // 订单列表
  app.get('/prod-order/company/order/queryOrderList', (req, res) => {
    readFile(`./mock/json/${req.path.replace('/', '').replace(/\//g, '-').toLowerCase()}.json`, 'json')
      .then(data => res.json(data))
      .catch((err) => res.status(500).send(err.message))
  })

  // 获取验证码
  app.get('/user-api/company/user/verifyCode/get', (req, res) => {
    readFile(`./mock/json/${req.path.replace('/', '').replace(/\//g, '-').toLowerCase()}.json`, 'json')
      .then(data => res.json(data))
      .catch((err) => res.status(500).send(err.message))
  })

  // 验证码登录
  app.post('/user-api/company/user/verifyCode/login', (req, res) => {
    readFile(`./mock/json/${req.path.replace('/', '').replace(/\//g, '-').toLowerCase()}.json`, 'json')
      .then(data => res.json(data))
      .catch((err) => res.status(500).send(err.message))
  })

  // 用户列表
  app.get('/user-api/company/user/queryUserList', (req, res) => {
    readFile(`./mock/json/${req.path.replace('/', '').replace(/\//g, '-').toLowerCase()}.json`, 'json')
      .then(data => res.json(data))
      .catch((err) => res.status(500).send(err.message))
  })
}

function readFile(path, encoding = 'json') {
  return new Promise((resolve, reject) => {
    fs.readFile(path, encoding === 'json' ? 'utf8' : encoding, (err, data) => {
      err ? reject(err) : resolve(encoding === 'json' ? JSON.parse(data) : data)
    })
  })
}

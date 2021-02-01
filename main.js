const express = require('express')
const app = express()

const colors = require('colors')

const { timeStamp } = require('./app/common/util')

require('./app/bootstrap/init')(app, express)
  .then(() => {
    app.listen(process.env.PORT || 10000)
  })
  .catch(e => {
    console.log(
      timeStamp() + '서버 초기화 도중 오류가 발생했어요: ' + e.message.red
    )
  })

process.on('uncaughtException', e => {
  console.log(timeStamp() + ('UncaughtException: ' + e.message).red)
})

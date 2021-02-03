const config = require('config')
const Sequelize = require('sequelize')

// sequelize 옵션 및 객체 생성
const sequelize = new Sequelize(
  config.get('database.db'),
  config.get('database.user'),
  config.get('database.password'),
  {
    define: {
      charset: 'utf8mb4' // emoji 사용을 위한 인코딩 방식 변경
    },
    host: config.get('database.host'),
    port: config.get('database.port'),
    dialect: 'mysql',
    logging: false
  }
)

exports.init = () => {
  // Database 인증 시도
  return sequelize.authenticate()
}

exports.Sequelize = Sequelize
exports.sequelize = sequelize

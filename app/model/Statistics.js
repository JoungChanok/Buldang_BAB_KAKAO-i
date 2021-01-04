const { Sequelize, sequelize } = require('../bootstrap/database')

// Statistics 모델 정의
const Statistics = sequelize.define('Statistics', {
  meal: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  // timetable: {
  //   type: Sequelize.INTEGER, 지원 종료
  //   allowNull: false,
  //   defaultValue: 0
  // },
  calendar: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  weather: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  freezeTableName: true
})

exports.init = async () => {
  await Statistics.sync({ force: true })
  await Statistics.create({
    meal: 0,
    // timetable: 0, 지원 종료
    calendar: 0,
    weather: 0
  })
}

exports.reset = async () => {
  await Statistics.destroy({
    where: {},
    truncate: true
  })
  await Statistics.create({
    meal: 0,
    // timetable: 0, 지원 종료
    calendar: 0,
    weather: 0
  })
}

exports.count = type => {
  const option = {}
  option[type] = Sequelize.literal(`${type} + 1`)
  return Statistics.update(option, {
    where: {},
    truncate: true
  })
}

exports.get = () => {
  return Statistics.findOne()
}

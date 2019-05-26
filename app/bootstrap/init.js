const config = require('config')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const calendar = require('../controller/Calendar')
const meal = require('../controller/Meal')
const weather = require('../controller/Weather')

const calendarSkill = require('../skill/calendar')
const mealSkill = require('../skill/meal')
const weatherSkill = require('../skill/weather')

const { timeStamp } = require('../common/util')
const school = require('./school').school

module.exports = async (app, express) => {
  const startTime = new Date()
  console.log(timeStamp() + 'Server initializing..')

  await require('./database').init()

  await calendar.init(school)
  await meal.init(school)
  await weather.init()

  await calendar.update()
  await meal.update()
  await weather.update()

  await require('./scheduler').init()

  // 포트 설정, 기본값 8080
  app.set('port', config.has('port') ? config.get('port') : 8080)

  // 미들웨어 사용
  app.use('/', express.static('public'))

  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  // Openbuilder 스킬 라우팅 등록
  calendarSkill(app)
  mealSkill(app)
  weatherSkill(app)

  console.log(timeStamp() + 'Initialization complete! ' + (new Date() - startTime + 'ms').yellow)
}

const config = require('config')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')

const admin = require('../controller/Admin')
const meal = require('../controller/Meal')
const statistics = require('../controller/Statistics')
// const timetable = require('../controller/Timetable')
const calendar = require('../controller/Calendar')
// const weather = require('../controller/Weather')

const mainSkill = require('../skill/main')
const mealSkill = require('../skill/meal')
const mealselectSkill = require('../skill/mealselect')
// const timetableSkill = require('../skill/timetable')
const calendarSkill = require('../skill/calendar')
const statSkill = require('../skill/statistics')
// const weatherSkill = require('../skill/weather')
const helpSkill = require('../skill/help')
const contactSkill = require('../skill/contact')
const bambooSkill = require('../skill/bamboo')
const developerSkill = require('../skill/developer')
const welcomeSkill = require('../skill/welcome')

const briefingSkill = require('../skill/briefing')

const { timeStamp } = require('../common/util')
const school = require('./school').school

const sessionOption = {
  secret: 'test_key',
  resave: true,
  saveUninitialized: true
}

module.exports = async (app, express) => {
  const startTime = new Date()
  console.log(timeStamp() + '서버 초기화 중이에요..')

  await require('./database').init()

  await admin.init()
  await meal.init(school)
  await statistics.init()
  // await timetable.init('천안불당고등학교')
  await calendar.init(school)
  // await weather.init()

  await meal.update()
  // await timetable.update()
  await calendar.update()
  // await weather.update()

  await require('./scheduler').init()

  // 포트 설정, 기본값 8080
  app.set('port', config.has('port') ? config.get('port') : 8080)

  // 미들웨어 사용
  app.use('/', express.static('public'))

  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(session(sessionOption))

  app.use(passport.initialize())
  app.use(passport.session())

  // Openbuilder 스킬 라우팅 등록
  mainSkill(app)
  mealSkill(app)
  mealselectSkill(app)
  statSkill(app)
  // timetableSkill(app)
  calendarSkill(app)
  // weatherSkill(app)
  helpSkill(app)
  briefingSkill(app)
  contactSkill(app)
  bambooSkill(app)
  developerSkill(app)
  welcomeSkill(app)
  require('../route/admin')(app)

  console.log(
    timeStamp() + '초기화를 끝냈어요!' + (new Date() - startTime + 'ms').yellow
  )
}

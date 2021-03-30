const schedule = require('node-schedule')

const Meal = require('../controller/Meal')
const Calendar = require('../controller/Calendar')
// const Weather = require('../controller/Weather')

const { timeStamp } = require('../common/util')

exports.init = () => {
  // 매일 00:00:01 급식데이터 및 이번달 일정 데이터 갱신
  schedule.scheduleJob('1 0 0 * * *', async () => {
    await Meal.update()
    await Calendar.update()
  })

  console.log(timeStamp() + '스케줄러를 초기화 했어요.'.cyan)
}

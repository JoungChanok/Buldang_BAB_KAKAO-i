const { timeStamp } = require('../common/util')
const StatisticsModel = require('../model/Statistics')

var Statistics = {}

Statistics.type = {
  MEAL: 'meal',
  TIMETABLE: 'timetable',
  CALENDAR: 'calendar',
  WEATHER: 'weather'
}

Statistics.init = async function () {
  await StatisticsModel.init()
  console.log(timeStamp() + '통계 모델이 정의됬어요.'.cyan)
}

Statistics.reset = async function () {
  await StatisticsModel.reset()
  console.log(timeStamp() + '통계 자료를 없앴습니다.'.yellow)
}

Statistics.count = async function (type = 'OTHER') {
  try {
    if (this.type[type]) {
      await StatisticsModel.count(this.type[type])
    }
  } catch (e) {
    console.log(timeStamp() + e.message.red)
  }
}

Statistics.get = async function () {
  try {
    const stat = await StatisticsModel.get()
    if (stat) {
      const total = stat['meal'] +
                    stat['timetable'] +
                    stat['calendar'] +
                    stat['weather']

      return `🍚 급식: ${(stat['meal'] / total * 100).toFixed(2)}%\n\n` +
             `📘 시간표: ${(stat['timetable'] / total * 100).toFixed(2)}%\n\n` +
             `📅 학사일정: ${(stat['calendar'] / total * 100).toFixed(2)}%\n\n` +
             `⛅ 날씨: ${(stat['weather'] / total * 100).toFixed(2)}%\n\n` +
             `✔️ 전체 기능 요청 수: ${total}회`
    } else {
      return '🤪 통계 데이터가 없습니다 🤪'
    }
  } catch (e) {
    console.log(timeStamp() + e.message.red)
    return '🤪 통계 데이터를 불러오는 중 문제가 발생했습니다 🤪'
  }
}

Statistics.getData = async function () {
  try {
    const stat = await StatisticsModel.get()
    if (stat) {
      const data = []
      data.push(stat['meal'])
      data.push(stat['timetable'])
      data.push(stat['calendar'])
      data.push(stat['weather'])
      return data
    }
  } catch (e) {
    console.log(timeStamp() + e.message.red)
    return [1, 1, 1, 1]
  }
}

module.exports = Statistics

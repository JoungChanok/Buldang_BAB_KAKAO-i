const { timeStamp } = require('../common/util')
const StatisticsModel = require('../model/Statistics')

var Statistics = {}

Statistics.type = {
  MAIN: 'main',
  BRIEFING: 'briefing',
  MEAL: 'meal',
  WEATHER: 'weather',
  CALENDAR: 'calendar',
  HELP: 'help',
  BAMBOO: 'bamboo'
  // TIMETABLE: 'timetable', 지원 종료
}

Statistics.init = async function () {
  await StatisticsModel.init()
  console.log(timeStamp() + '사용자 통계 데이터 모델을 정의합니다.'.cyan)
}

Statistics.reset = async function () {
  await StatisticsModel.reset()
  console.log(timeStamp() + '사용자 통계 데이터를 초기화 합니다.'.yellow)
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
      const total =
        stat.main +
        stat.briefing +
        stat.meal +
        stat.calendar +
        stat.weather +
        stat.help +
        // stat['timetable'] + 지원 종료
        stat.bamboo

      return (
        `🎉 시작하기: ${((stat.main / total) * 100).toFixed(2)}%\n\n` +
        `🚥 브리핑: ${((stat.briefing / total) * 100).toFixed(2)}%\n\n` +
        `🍚 급식: ${((stat.meal / total) * 100).toFixed(2)}%\n\n` +
        //  `📘 시간표: ${(stat['timetable'] / total * 100).toFixed(2)}%\n\n` + 지원 종료
        `⛅ 날씨: ${((stat.weather / total) * 100).toFixed(2)}%\n\n` +
        `📅 학사일정: ${((stat.calendar / total) * 100).toFixed(2)}%\n\n` +
        `😉 도움말: ${((stat.help / total) * 100).toFixed(2)}%\n\n` +
        `🎍 대나무숲: ${((stat.bamboo / total) * 100).toFixed(2)}%\n\n` +
        `✔️ 전체 기능 요청 수: ${total}회`
      )
    } else {
      return '🤪 통계 데이터가 없습니다 🤪'
    }
  } catch (e) {
    console.log(timeStamp() + e.message.red)
    return '🤪사용자 통계 데이터를 갱신하는 중 문제가 발생했습니다 🤪'
  }
}

Statistics.getData = async function () {
  try {
    const stat = await StatisticsModel.get()
    if (stat) {
      const data = []

      data.push(stat.main)
      data.push(stat.briefing)
      data.push(stat.meal)
      data.push(stat.weather)
      // data.push(stat['timetable']) 지원 종료
      data.push(stat.calendar)
      data.push(stat.help)
      data.push(stat.bamboo)
      return data
    }
  } catch (e) {
    console.log(timeStamp() + e.message.red)
    return [1, 1, 1, 1, 1, 1, 1]
  }
}

module.exports = Statistics

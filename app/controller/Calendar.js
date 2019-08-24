const { timeStamp } = require('../common/util')
const CalendarModel = require('../model/Calendar')

var Calendar = {}

Calendar.init = async function (school) {
  this.school = school
  await CalendarModel.init()
  console.log(timeStamp() + '학사 일정 모델을 정의했어요.'.cyan)
}

Calendar.update = async function () {
  try {
    const result = await this.school.getCalendar()
    await CalendarModel.update(result)
    console.log(timeStamp() + '학사 일정이 업데이트 되었어요.'.green)
  } catch (e) {
    console.log(timeStamp() + e.message.red)
  }
}

Calendar.get = async function () {
  try {
    const rows = await CalendarModel.get()
    let resultString = ''
    if (rows) {
      for (let row of rows) {
        resultString += `${row.month}월 ${row.day}일: ${row.content}\n`
      }
      return resultString.replace(/\n$/, '')
    } else {
      return resultString + '😥학사일정 정보가 없어요😥'
    }
  } catch (e) {
    console.log(timeStamp() + e.message.red)
    return '🤪학사일정 데이터를 불러오는 중 문제가 발생했어요🤪'
  }
}

module.exports = Calendar

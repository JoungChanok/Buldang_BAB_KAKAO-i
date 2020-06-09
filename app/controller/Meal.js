const { timeStamp } = require('../common/util')
const MealModel = require('../model/Meal')

var Meal = {}

Meal._week = ['일', '월', '화', '수', '목', '금', '토']

Meal.init = async function (school) {
  this.school = school
  await MealModel.init()
  console.log(timeStamp() + '급식 데이터 모델을 정의합니다.'.cyan)
}

Meal.update = async function () {
  try {
    const mealInfo = await this.school.getMeal()

    // 월, 일, 요일
    const date = new Date()
    const month = date.getMonth() + 1
    let day = date.getDate()
    let weekDay = date.getDay()
    let tomorrow = day + 1

    // 이번달의 마지막 날 (일)
    const lastDay = new Date(date.getYear(), month, 0).getDate()
    const data = []

    // 오늘 급식
    data.push({
      date: `${month}월 ${day}일 ${this._week[weekDay]}요일`,
      info: mealInfo[day].replace(/[,]/g,', ').replace(/[.]/g,'').replace(/[0-9]/g,''), // replace
      type: 'today'
    })

    // 내일 급식 (이번 달 마지막 날짜 이하인 경우)
    if (tomorrow <= lastDay) {
      data.push({
        date: `${month}월 ${tomorrow}일 ${this._week[weekDay + 1 > 6 ? 6 - weekDay : weekDay + 1]}요일`,
        info: mealInfo[tomorrow].replace(/[,]/g,', ').replace(/[.]/g,'').replace(/[0-9]/g,''), // replace
        type: 'tomorrow'
      })
    }

    await MealModel.update(data)
    console.log(timeStamp() + '급식 데이터를 갱신합니다.'.green)
  } catch (e) {
    console.log(timeStamp() + e.message.red)
  }
}

Meal.get = async function (type) {
  try {
    const row = await MealModel.get(type || 'today')
    if (row && row.date && row.info) {
      return row.date + '\n\n' + row.info
    }
    return '😥 나이스에서 급식정보를 받아오지 못했습니다 😥'
  } catch (e) {
    console.log(timeStamp() + e.message.red)
    return '🤪 급식 데이터를 갱신하는 중 문제가 발생했습니다 🤪'
  }
}

module.exports = Meal

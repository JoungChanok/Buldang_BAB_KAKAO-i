// const { timeStamp } = require('../common/util')
// const TimetableModel = require('../model/Timetable')

// const Comcigan = require('comcigan-parser')
// const comcigan = new Comcigan()

// var Timetable = {}

// Timetable._baseUrl = 'http://comci.kr:4081'
// Timetable._url = 'http://comci.kr:4081/st'
// Timetable._weekdayString = ['일', '월', '화', '수', '목', '금', '토']
// Timetable._numberEmoji = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣']

// Timetable.init = async function (schoolKeyword) {
//   this._school = schoolKeyword
//   await TimetableModel.init()
//   console.log(timeStamp() + '학급 시간표 데이터 모델을 정의합니다.'.cyan)

//   await comcigan.init()
//   await comcigan.setSchool(schoolKeyword)
// }

// Timetable.update = async function () {
//   try {
//     const data = await comcigan.getTimetable()
//     const insertData = []

//     // data를 가공하여 insertData에 삽입
//     Object.keys(data).forEach(grade => { // 학년
//       Object.keys(data[grade]).forEach(cls => { // 반
//         data[grade][cls].forEach(weekDay => { // 월~금
//           insertData.push(...weekDay) // 요일 데이터 분해하여 insertData에 삽입
//         })
//       })
//     })

//     await TimetableModel.update(insertData)
//     console.log(timeStamp() + '학급 시간표 데이터를 갱신합니다.'.green)
//   } catch (e) {
//     console.log(e)
//     console.log(timeStamp() + e.message.red)
//   }
// }

// Timetable.get = async function (grade, classNum, weekday) {
//   try {
//     const rows = await TimetableModel.get(grade, classNum, weekday)
//     if (rows.length > 0) {
//       let timetableResult = `📅 ${grade}학년 ${classNum}반 ${this._weekdayString[weekday]}요일 시간표\n\n`
//       for (let row of rows) {
//         let data = row.dataValues
//         timetableResult += `${this._numberEmoji[data.class_time - 1]}교시 - ${data.subject} (${data.teacher})\n`
//       }
//       return timetableResult.replace(/\n$/, '')
//     } else {
//       return '🤪 시간표 정보가 없는 것 같습니다 🤪'
//     }
//   } catch (e) {
//     console.log(timeStamp() + e.message.red)
//     return '🤪 학급 시간표 데이터를 갱신하는 중 문제가 발생했습니다 🤪'
//   }
// }

// module.exports = Timetable

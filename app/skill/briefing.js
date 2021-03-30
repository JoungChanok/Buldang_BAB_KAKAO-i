const config = require('config')
const statistics = require('../controller/Statistics')
const calcontroller = require('../controller/Calendar')
const mealcontroller = require('../controller/Meal')

const routerName = config.get('proxy') + '/briefing'

module.exports = app => {
  app.post(routerName, async (req, res) => {
    await statistics.count('BRIEFING')
    const calendarData = await calcontroller.get()
    const params = req.body.action.params || {}
    const type = JSON.parse(params.sys_date || '{ "dateTag": "today" }')
    const mealData = await mealcontroller.get(type.dateTag)

    res.json({
      version: '2.0',
      template: {
        outputs: [
          {
            basicCard: {
              description: '📅 이번 달 학사일정입니다!\n\n' + calendarData
            }
          },
          // {
          //   basicCard: {
          //     description: '🌈 기상청 날씨정보입니다!\n\n' + weatherData
          //   }
          // },
          {
            basicCard: {
              description: '🍚 오늘의 급식정보입니다!\n\n' + mealData
            }
          }
        ],
        quickReplies: [
          {
            label: '메뉴 보기',
            action: 'message',
            messageText: '메뉴 보기'
          }
        ]
      }
    })
  })
}

const config = require('config')
const statistics = require('../controller/Statistics')
const calcontroller = require('../controller/Calendar')
const mealcontroller = require('../controller/Meal')
const weathercontroller = require('../controller/Weather')

const routerName = config.get('proxy') + '/briefing'

module.exports = app => {
  app.post(routerName, async (req, res) => {
    await statistics.count('BRIEFING')
    const calendarData = await calcontroller.get()
    const weatherData = await weathercontroller.get()
    const params = req.body.action['params'] || {}
    const type = JSON.parse(params['sys_date'] || '{}')
    const mealData = await mealcontroller.get(type['dateTag'])

    let typeString = '🍚 오늘의 급식을 알려드릴게요!\n\n'
    if (type['dateTag'] === 'tomorrow') {
      typeString = '🍱 내일의 급식을 알려드릴게요!\n\n'
    } else if (type['dateTag'] === 'yesterday') {
      typeString = '지난 급식 정보는 제공하지 않아요..😭\n\n'
    }

    res.json({
      version: '2.0',
      template: {
        outputs: [
          {
            basicCard: {
              description: '📅 이번 달 학사일정입니다!\n(때에 따라선 공백일 수 있습니다)\n' + calendarData
            }
          },
          {
            basicCard: {
              description: '🌈 기상청 날씨정보입니다!\n\n' + weatherData
            }
          },
          {
            basicCard: {
              description: typeString + mealData
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

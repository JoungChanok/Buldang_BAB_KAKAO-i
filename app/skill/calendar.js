const config = require('config')
const controller = require('../controller/Calendar')

const routerName = config.get('proxy') + '/calendar'

module.exports = app => {
  app.post(routerName, async (req, res) => {
    const calendarData = await controller.get()

    res.json({
      version: '2.0',
      template: {
        outputs: [
          {
            simpleText: {
              text: '📅 이번 달 학사일정입니다!'
            }
          },
          {
            simpleText: {
              text: calendarData
            }
          }
        ],
        quickReplies: [
          {
            label: '홈으로',
            action: 'message',
            messageText: '홈으로'
          }
        ]
      }
    })
  })
}

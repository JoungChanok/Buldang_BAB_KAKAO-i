const config = require('config')
const controller = require('../controller/Weather')

const routerName = config.get('proxy') + '/weather'

module.exports = app => {
  app.post(routerName, async (req, res) => {
    const weatherData = await controller.get()

    res.json({
      version: '2.0',
      template: {
        outputs: [
          {
            simpleText: {
              text: '🌈 기상청 날씨정보입니다!'
            }
          },
          {
            simpleText: {
              text: weatherData
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

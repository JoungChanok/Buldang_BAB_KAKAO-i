const config = require('config')
const statistics = require('../controller/Statistics')
const controller = require('../controller/Statistics')

const routerName = config.get('proxy') + '/statistics'

module.exports = app => {
  app.post(routerName, async (req, res) => {
    await statistics.count('STATISTICS')
    const statData = await controller.get()
    res.json({
      version: '2.0',
      template: {
        outputs: [
          {
            basicCard: {
              description:'오늘 하루 여러분들이 사용하신 메뉴입니다 🤗\n\n' + statData
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

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
              title: '여러분들이 사용한 메뉴의 사용량 통계입니다! 😃',
              description: statData,
              thumbnail: {
                imageUrl: 'https://i.postimg.cc/HkVW1Gqr/Statistics.png'
              }
            }
          },
          // {
          //   simpleText: {
          //     text: '여러분들이 사용한 메뉴의 사용량 통계입니다! 😃'
          //   }
          // },
          // {
          //   simpleText: {
          //     text: statData
          //   }
          // }
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

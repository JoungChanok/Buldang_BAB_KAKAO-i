const config = require('config')
const statistics = require('../controller/Statistics')
const controller = require('../controller/Meal')

const routerName = config.get('proxy') + '/meal'

module.exports = app => {
  app.post(routerName, async (req, res) => {
    await statistics.count('MEAL')
    const params = req.body.action['params'] || {}
    const type = JSON.parse(params['sys_date'] || '{}')
    const mealData = await controller.get(type['dateTag'])

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
              description: typeString + mealData,
              buttons: [
                {
                  action: 'share',
                  label: '🔗공유하기'
                }
              ]
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
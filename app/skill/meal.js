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

    let typeString = 'https://i.postimg.cc/htwMt7Y0/Today-Meal.png'
    if (type['dateTag'] === 'tomorrow') {
      typeString = 'https://i.postimg.cc/SKMd2xFb/Tomorrow-Meal.png'
    } else if (type['dateTag'] === 'yesterday') {
      typeString = 'https://i.postimg.cc/xCGP5p1s/Yesterday-Meal.png'
    }

    res.json({
      version: '2.0',
      template: {
        outputs: [
          {
            basicCard: {
              description: mealData,
              thumbnail: {
                imageUrl: typeString
              }
            }
          },
          // {
          //   simpleText: {
          //     text: typeString
          //   }
          // },
          // {
          //   simpleText: {
          //     text: mealData
          //   }
          // }
        ],
        quickReplies: [
          {
            label: '시간표좀 알려줄래?',
            action: 'message',
            messageText: '시간표좀 알려줘'
          },
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

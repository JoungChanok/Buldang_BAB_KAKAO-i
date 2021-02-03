const config = require('config')

const RouterName = config.get('proxy') + '/mealselect'

module.exports = app => {
  app.post(RouterName, async (req, res) => {
    res.json({
      version: '2.0',
      template: {
        outputs: [
          {
            basicCard: {
              description: '언제 급식을 알고 싶으세요? 🤔'
            }
          }
        ],
        quickReplies: [
          {
            label: '🍚 오늘 급식',
            action: 'message',
            messageText: '오늘 급식은 뭐야?'
          },
          {
            label: '🍱 내일 급식',
            action: 'message',
            messageText: '내일 급식은 뭐야?'
          },
          {
            label: '🍖이번주 급식',
            action: 'message',
            messageText: '이번주 급식은 뭐야?'
          }
        ]
      }
    })
  })
}

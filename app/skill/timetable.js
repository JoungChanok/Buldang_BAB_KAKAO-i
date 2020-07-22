const config = require('config')
const statistics = require('../controller/Statistics')
const controller = require('../controller/Timetable')

const routerName = config.get('proxy') + '/timetable'

module.exports = app => {
  app.post(routerName, async (req, res) => {
    await statistics.count('TIMETABLE')
    const params = req.body.action['params'] || {}
    const date = JSON.parse(params['sys_date'] || '{}')
    const dateString = date['date']
    const targetDate = new Date(dateString)
    const day = targetDate.getDay()

    const gradeParam = JSON.parse(params['grade'] || '{}')
    const classParam = JSON.parse(params['class'] || '{}')

    const gradeNum = gradeParam['amount'] || 0
    const classNum = classParam['amount'] || 0

    const timetableData = await controller.get(gradeNum, classNum, day)

    res.json({
      version: '2.0',
      template: {
        outputs: [
          {
            basicCard: {
              description: '죄송합니다. 현재 시간표 담당 선생님께서 시간표를 올려주시지 않아 확인을 할 수 없습니다 😥'
            }
          }
        ],
        quickReplies: [
          {
            label: '급식 확인',
            action: 'message',
            messageText: '당밥아 급식 알려줘'
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

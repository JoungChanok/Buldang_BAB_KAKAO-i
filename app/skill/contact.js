const config = require('config')
const statistics = require('../controller/Statistics')

const routerName = config.get('proxy') + '/contact'

module.exports = app => {
  app.post(routerName, async (req, res) => {
    await statistics.count('CONTACT')

    res.json({
      version: '2.0',
      template: {
        outputs: [
          {
            basicCard: {
              description:
                '📞 행정실과 교무실 연락처 입니다 !\n\n\n행정실: 041-622-9572\n\n교무실: 041-622-9571\n\n교장실: 041-622-9570\n\nfax: 041-622-9573',
              buttons: [
                {
                  action: 'phone',
                  label: '행정실에 전화하기',
                  phoneNumber: '041-622-9572'
                },
                {
                  action: 'phone',
                  label: '교무실에 전화하기',
                  phoneNumber: '041-622-9571'
                },
                {
                  action: 'phone',
                  label: '교장실에 전화하기',
                  phoneNumber: '041-622-9570'
                }
              ]
            }
          }
        ],
        quickReplies: [
          {
            label: '메뉴 보기',
            action: 'block',
            blockId: '5d5bdfa692690d000180c5f5'
          }
        ]
      }
    })
  })
}

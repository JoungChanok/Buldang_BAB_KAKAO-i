const config = require('config')
const statistics = require('../controller/Statistics')

const routerName = config.get('proxy') + '/developer'

module.exports = app => {
  app.post(routerName, async (req, res) => {
    res.json({
      version: '2.0',
      template: {
        outputs: [
          {
            basicCard: {
              description:
                '💻 개발자: 정찬옥\n\n📫 메신저: m.me/BuldangBAB\n\n\n챗봇에 대한 건의사항 및 문제신고는 메신저로 보내주세요!',
              buttons: [
                {
                  action: 'webLink',
                  label: 'FB Messeger',
                  webLinkUrl: 'https://m.me/BuldangBAB'
                },
                {
                  action: 'webLink',
                  label: '불당밥 페이지',
                  webLinkUrl: 'https://www.facebook.com/BuldangBAB/'
                }
              ]
            }
          },
          {
            commerceCard: {
              description: '동냥하는 개발자를 동정해주세요(?)',
              price: 1000,
              currency: 'won',
              thumbnails: [
                {
                  imageUrl:
                    'http://k.kakaocdn.net/dn/CGr4G/btqytTmRSU9/2tuNwOuQYSB5RQB7qu9bLk/2x1.jpg',
                  link: {
                    web:
                      'supertoss://send?bank=카카오뱅크&accountNo=3333146115425&origin=linkgen&amount=1000'
                  }
                }
              ],
              profile: {
                imageUrl:
                  'http://k.kakaocdn.net/dn/dbMpML/btqytTmRTUB/9Xscv9wy5eq3Vz4BLeZLv0/1x1th.jpg',
                nickname: '불당밥'
              },
              buttons: [
                {
                  label: '도움주기',
                  action: 'webLink',
                  webLinkUrl:
                    'supertoss://send?bank=카카오뱅크&accountNo=3333146115425&origin=linkgen&amount=1000'
                },
                {
                  label: '공유하기',
                  action: 'share'
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

const config = require('config')
const statistics = require('../controller/Statistics')

const routerName = config.get('proxy') + '/main'

module.exports = app => {
  app.post(routerName, async (req, res) => {
    await statistics.count('MAIN')

    res.json({
      version: '2.0',
      template: {
        outputs: [
          {
            basicCard: {
              description: '사용하시려는 기능을 선택해주세요! 😉'
            }
          },
          {
            carousel: {
              type: 'basicCard',
              header: {
                title: '🎉 환영합니다!',
                description: '언제 오시나 계속 기다렸어요 🥰',
                thumbnail: {
                  imageUrl:
                    'http://k.kakaocdn.net/dn/vVhwx/btqEg1Umigd/AuLKglOXyg6JMbtmQblqI1/backimg.jpg'
                }
              },
              items: [
                {
                  title: '🍱 오늘 급식은 뭐야?',
                  thumbnail: {
                    imageUrl:
                      'http://k.kakaocdn.net/dn/m3hrK/btqx8Yb06tW/jU3aXs6yG66KQIwQ3zUF6k/2x1.jpg'
                  },
                  buttons: [
                    {
                      action: 'block',
                      label: '급식 확인하기',
                      blockId: '5d5be0cb8192ac00011f0311'
                    }
                  ]
                },
                {
                  title: '📅 내일은 뭐하지?',
                  thumbnail: {
                    imageUrl:
                      'http://k.kakaocdn.net/dn/cuQy4n/btqyag4jsGT/sJKrfbKmdth0SNreskADW0/2x1.jpg'
                  },
                  buttons: [
                    {
                      action: 'block',
                      label: '학사일정 확인하기',
                      blockId: '5d5be1648192ac00011f0324'
                    }
                  ]
                },
                {
                  title: '⛅ 오늘 날씨는 어때?',
                  thumbnail: {
                    imageUrl:
                      'http://k.kakaocdn.net/dn/WDAIH/btqycgP48gU/xIwlL8LzIgdUFdNfF1yqb0/2x1.jpg'
                  },
                  buttons: [
                    {
                      action: 'block',
                      label: '날씨 확인하기',
                      blockId: '5d5be15e8192ac00011f0322'
                    }
                  ]
                },
                {
                  title: '📊 통계가 궁금해',
                  thumbnail: {
                    imageUrl:
                      'http://k.kakaocdn.net/dn/XJWO6/btqEgQMlXRK/0tPSkAqcTeSR5Qm2NkYXJK/2x1.jpg'
                  },
                  buttons: [
                    {
                      action: 'block',
                      label: '통계 확인하기',
                      blockId: '5e6c8aaf4322e50001989887'
                    }
                  ]
                },
                {
                  title: '🧐 개발자는 누구야?',
                  thumbnail: {
                    imageUrl:
                      'http://k.kakaocdn.net/dn/bf1kUo/btqya5uHRo2/vUN9xvkNmMNsP8DEYVtN50/2x1.jpg'
                  },
                  buttons: [
                    {
                      action: 'block',
                      label: '알아보기',
                      blockId: '5d5c03e4b617ea0001c129b5'
                    }
                  ]
                },
                {
                  title: '🤗 대나무숲에 제보할래',
                  thumbnail: {
                    imageUrl:
                      'http://k.kakaocdn.net/dn/bhqPjS/btqyRNU6umA/konc1q8Luzcm9Np5JzXTb1/resize.jpg'
                  },
                  buttons: [
                    {
                      action: 'block',
                      label: '제보하러가기',
                      blockId: '5d9b3eaf8192ac0001155439'
                    }
                  ]
                }
              ]
            }
          }
        ],
        quickReplies: [
          {
            label: '브리핑 해줘 😚',
            action: 'block',
            blockId: '60050b4f5828a222e5d6c6a5'
          },
          {
            label: '도와주세요 😰',
            action: 'block',
            blockId: '5d5be45db617ea0001c12927'
          }
        ]
      }
    })
  })
}

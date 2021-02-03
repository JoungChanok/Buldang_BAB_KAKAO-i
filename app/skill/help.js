const config = require('config')
const statistics = require('../controller/Statistics')

const routerName = config.get('proxy') + '/help'

module.exports = app => {
  app.post(routerName, async (req, res) => {
    await statistics.count('HELP')

    res.json({
      version: '2.0',
      template: {
        outputs: [
          {
            basicCard: {
              description:
                '도움이 필요하시면 언제든지 도와달라는 메시지를 보내주세요!\n\n저는 다양한 기능을 제공하고 있어요~!\n\n현재 제공하는 기능은 아래와 같아요\n🍚 오늘, 내일 급식 조회\n📅 이번 달 학사일정 조회\n⛅ 불당동 날씨 예보 확인\n\n챗봇 사용 방법은 버튼 뿐만 아니라\n"오늘 급식 뭐야?"\n"지금 날씨 어때?"\n"학사일정 알려줘"등\n메시지로 입력해도 알아들을 수 있어요!\n\n다만, 아직 배우지 않은 내용은 대답하지 못하거나 다른 내용으로 화제를 전환 할 수도 있어요 😥\n\n또한 대화 도중 마치고 싶을 땐 "처음으로"를 입력해서 대화를 중단할 수 있어요 😗'
            }
          }
        ],
        quickReplies: [
          {
            label: '고마워!',
            action: 'block',
            blockId: '5d5bdfa692690d000180c5f5'
          }
        ]
      }
    })
  })
}

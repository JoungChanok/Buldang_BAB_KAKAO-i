const config = require('config')
const statistics = require('../controller/Statistics')

const routerName = config.get('proxy') + '/bamboo'

module.exports = app => {
  app.post(routerName, async (req, res) => {
    await statistics.count('BAMBOO')

    res.json({
      version: '2.0',
      template: {
        outputs: [
          {
            basicCard: {
              title: '불당고 대나무숲과 연동되어 있습니다.',
              description: '이곳에서 바로 제보하셔도 됩니다. 🙃',
              thumbnail: {
                imageUrl:
                  'http://k.kakaocdn.net/dn/cSdMR6/btqyUVYD9z4/OKN58xNtIJldB025LtEbr1/2x1.jpg',
                link: {
                  web: 'https://bulind.space'
                }
              },
              buttons: [
                {
                  action: 'webLink',
                  label: '제보함으로 이동하기',
                  webLinkUrl: 'https://bulind.space'
                },
                {
                  action: 'webLink',
                  label: '대나무숲으로 이동하기',
                  webLinkUrl: 'https://www.facebook.com/BuldangBamboo'
                },
                {
                  action: 'operator',
                  label: '당밥이한테 제보하기'
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

const config = require("config");
const statistics = require("../controller/Statistics");

const routerName = config.get("proxy") + "/welcome";

module.exports = (app) => {
  app.post(routerName, async (req, res) => {
    await statistics.count("WELCOME");

    res.json({
      version: "2.0",
      template: {
        outputs: [
          {
            basicCard: {
              description: "전 불당밥이라고 해요! 만나서 반가워요.",
            },
          },
          {
            basicCard: {
              description:
                "급식 정보를 알고 싶으신가요?\n\n제가 도와드릴 수 있을 것 같아요!\n\n준비되셨나요?",
            },
          },
          {
            basicCard: {
              description:
                "먼저, 언제 급식을 보고 싶으신가요?\n\n아래 버튼을 누르거나 '오늘 급식'이라고 타이핑해보세요!",
            },
          },
        ],
        quickReplies: [
          {
            label: "오늘 급식",
            action: "message",
            messageText: "오늘 급식은 뭐야?",
          },
          {
            label: "내일 급식",
            action: "message",
            messageText: "내일 급식은 뭐야?",
          },
          {
            label: "메뉴 보여줘",
            action: "message",
            blockId: "메뉴 보여줘",
          },
        ],
      },
    });
  });
};

const { comment, history, user } = require("../../models");
const userAuthen = require("../authentication/userAuthen");

module.exports = async (req, res) => {
  try {
    const { historyId } = req.params;
    const comment_content = req.body.comments_content;
    const userInfo = await userAuthen(req, res);
    // console.log(req);
    // console.log(comment_content);

    if (!userInfo) {
      return res
        .status(401)
        .send({ data: null, message: "먼저 로그인 해주세요!" });
    }
    if (!comment_content) {
      return res.status(400).send({
        data: null,
        message: "댓글 등록 정보를 올바르게 입력했는지 확인해주세요!",
      });
    }

    const matchHistoryId = await history.findOne({
      where: {
        id: historyId,
      },
    });
    // console.log(matchHistoryId);

    if (!matchHistoryId) {
      return res.status(404).send({
        data: null,
        message: "올바르지 않은 history에 댓글을 작성하려합니다!",
      });
    }

    await comment
      .create({
        history_id: historyId,
        user_id: userInfo.id,
        comment_content: comment_content,
      })
      .then((data) => {
        res
          .status(201)
          .send({ data: data.dataValues, message: "댓글 작성 완료!" });
      });
  } catch (err) {
    return res
      .status(500)
      .send({ data: null, message: "내부서버 오류입니다!" });
  }
};

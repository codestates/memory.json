const { comment } = require("../../models");
const userAuthen = require("../authentication/userAuthen");

module.exports = async (req, res) => {
  const commentId = req.params.commentId;
  const userInfo = await userAuthen(req);

  if (!userInfo) {
    return res
      .status(401)
      .send({ data: null, message: "먼저 로그인해주세요!" });
  }
  const commentContent = await comment.findOne({
    where: {
      id: commentId,
    },
  });

  if (commentContent.dataValues.user_id !== userInfo.id) {
    return res
      .status(403)
      .send({ data: null, message: "다른 사람의 댓글을 삭제하려 하나요?" });
  }
  if (!commentContent) {
    return res.status(404).send({
      data: null,
      message: "올바르지 않은 history에 댓글을 삭제하려 합니다!",
    });
  }

  await comment
    .destroy({
      where: { id: commentId },
    })
    .then((data) => {
      res
        .status(200)
        .send({
          data: { commentId: commentId },
          message: `${commentId}번 히스토리 정보 삭제 성공`,
        });
    })
    .catch((err) => {
      res.send(err);
    });
};

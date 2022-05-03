const { comment } = require("../../models");
const userAuthen = require("../authentication/userAuthen");

module.exports = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const comment_content = req.body.comment_content;
    const userInfo = await userAuthen(req);

    if (!userInfo) {
      return res
        .status(401)
        .send({ data: null, message: "먼저 로그인해주세요!" });
    }
    if (!comment_content) {
      return res.status(400).send({
        data: null,
        message: "댓글 등록 정보를 올바르게 입력했는지 확인해주세요!",
      });
    }

    const commentContent = await comment.findOne({
      where: {
        id: commentId,
      },
    });

    if (commentContent.dataValues.user_id !== userInfo.id) {
      return res
        .status(403)
        .send({ data: null, message: "다른 사람의 댓글을 수정하려 하나요?" });
    }

    if (!commentContent) {
      return res.status(404).send({
        data: null,
        message: "올바르지 않은 history에 댓글을 수정하려 합니다!",
      });
    }

    await comment.update(
      {
        comment_content: comment_content,
      },
      { where: { id: commentId } }
    );
    await comment
      .findOne({
        where: { id: commentId },
      })
      .then((data) => {
        res
          .status(200)
          .send({ data: data.dataValues, message: "댓글 수정 완료!" });
      })
      .catch((err) => {
        res.send(err);
      });
  } catch (err) {
    return res
      .status(500)
      .send({ data: null, message: "내부서버 오류입니다!" });
  }
};

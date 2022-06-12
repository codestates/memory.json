const { comment, history, user } = require("../../models");
const userAuthen = require("../authentication/userAuthen");

module.exports = async (req, res) => {
  try {
    const { historyId } = req.params;
    const userInfo = await userAuthen(req, res);
    // console.log(req);
    console.log(historyId);

    const listComment = await comment.findAll({
      where: {
        history_id: historyId,
      }
    })
    console.log(listComment)
        return res
          .status(200)
          .send({ data: {listComment: listComment}, message: "댓글 조회 완료!" });
  } catch (err) {
    return res
      .status(500)
      .send({ data: null, message: "내부서버 오류입니다!" });
  }
};

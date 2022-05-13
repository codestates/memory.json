const userAuthen = require("../authentication/userAuthen");
const { favorite } = require("../../models");

module.exports = async (req, res) => {
  try {
    const userInfo = {}
    if(req.headers.authorization) {
      userInfo = await userAuthen(req);
    }
    const history_id = req.params.historyId;
    // console.log(userInfo.id);
    // console.log(history_id);

    const isFavorite = await favorite.findOne({
      where: {
        history_id: history_id,
        user_id: userInfo.id,
      },
    });

    const isLike = !isFavorite ? "F" : isFavorite.dataValues.like;
    console.log(isLike)

    const likeCount = await favorite
      .findAll({
        where: {
          history_id: history_id,
          like: "T",
        },
      })
      .then((data) => {
        return data.length;
      });
    console.log(likeCount);

    
      return res
        .status(200)
        .send({
          data: { like: isLike, like_count: likeCount },
          message: "ok",
        });
  } catch (err) {
    return res
      .status(500)
      .send({ data: null, message: "내부서버 오류입니다!" });
  }
};

const userAuthen = require("../authentication/userAuthen");
const { favorite } = require("../../models");

module.exports = async (req, res) => {
  try {
    const userInfo = await userAuthen(req);
    const history_id = req.body.history_id;
    // console.log(userInfo.id);
    // console.log(history_id);

    const isFavorite = await favorite.findOne({
      where: {
        history_id: history_id,
        user_id: userInfo.id,
      },
    });

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

    if (!isFavorite) {
      await favorite
        .create({
          history_id: history_id,
          user_id: userInfo.id,
          like: "T",
        })
        .then((data) => {
          return res.status(200).send({
            data: {
              like: data.dataValues.like,
              like_count: likeCount + 1,
              history_id: isFavorite.dataValues.history_id,
            },
            message: "ok",
          });
        });
      return;
    }

    const isLike = isFavorite.dataValues.like;
    if (isLike === "T") {
      await favorite.update(
        {
          like: "F",
        },
        { where: { id: isFavorite.dataValues.id } }
      );
      return res.status(200).send({
        data: {
          like: "F",
          like_count: likeCount - 1,
          history_id: isFavorite.dataValues.history_id,
        },
        message: "ok",
      });
    }

    if (isLike === "F") {
      await favorite.update(
        {
          like: "T",
        },
        { where: { id: isFavorite.dataValues.id } }
      );
      return res.status(200).send({
        data: {
          like: "T",
          like_count: likeCount + 1,
          history_id: isFavorite.dataValues.history_id,
        },
        message: "ok",
      });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ data: null, message: "내부서버 오류입니다!" });
  }
};

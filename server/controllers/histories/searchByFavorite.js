const { favorite, history } = require("../../models");

module.exports = async (req, res) => {
  try {
    // 패스 파라미터 조회
    const user_id = req.params.userId;

    const favoriteByUser = await favorite.findAll({
      where: { user_id },
      raw: true,
      include: [
        {
          model: history,
          require: false,
          attributes: [],
        },
      ],
      attributes: [
        "history.id",
        "history.place_id",
        "history.user_id",
        "history.history_title",
        "history.history_content",
        "history.history_year",
        "history.createdAt",
        "history.updatedAt",
      ],
    });
    // console.log(favoriteByUser);

    return (
      res.status(200),
      json({
        data: favoriteByUser,
        message: "history 목록 조회 성공!",
      })
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      data: null,
      message: "내부서버 오류입니다!",
    });
  }
};

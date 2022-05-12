const { favorite, history } = require("../../models");

module.exports = async (req, res) => {
  try {
    // 패스 파라미터 조회
    const user_id = req.params.userId;

    // 쿼리 스트링을 조회한다.
    const pageNumber = req.query.page;
    // console.log(pageNumber);
    let offset = 0;
    
    if (pageNumber > 1) {
      offset = 2 * (pageNumber - 1);
    }

    const favoriteByUser = await favorite.findAndCountAll({
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
      offset,
      limit: 2
    });
    // console.log(favoriteByUser);


      return res.status(200).json({
        data: favoriteByUser,
        message: "history 목록 조회 성공!",
      })
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      data: null,
      message: "내부서버 오류입니다!",
    });
  }
};

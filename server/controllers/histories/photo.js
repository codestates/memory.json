const { photo } = require("../../models");

module.exports = async (req, res) => {
  try {
    const history_id = req.query.historyid;

    const photoInfo = await photo.findAll({
      raw: true,
      where: {
        history_id,
      },
    });
    // console.log(photoInfo)
    return res.status(200).json({
      data: photoInfo,
      message: "사진 목록 조회 성공",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      data: null,
      message: "내부서버 오류입니다!",
    });
  }
};

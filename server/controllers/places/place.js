const { place } = require("../../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

module.exports = async (req, res) => {
  try {
    // 파라미터 조회
    const placeAddress = req.query.place_address;
    // console.log(placeAddress);

    // DB에서 파라미터와 유사한 결과를 모두 조회. 예를들어 파라미터가 서울특별시 용산이면
    // 서울특별시 용산에 대한 모든 결과를 조회함.
    const findByKeyword = await place.findAll({
      raw: true,
      where: {
        place_address: {
          [Op.like]: `${placeAddress}%`,
        },
      },
    });
    // console.log(findByKeyword);

    // 결과를 보내줌
    return res.status(200).json({
      data: findByKeyword,
      message: "ok",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      data: null,
      message: "내부서버 오류입니다!",
    });
  }
};

const userAuthen = require("../authentication/userAuthen");

module.exports = async (req, res) => {
  // res.send('유저정보')
  try {
    const userInfo = await userAuthen(req, res);

    if (!userInfo) {
      return res
        .status(401)
        .send({ data: null, message: "로그인을 확인해주세요!" });
    } else {
      delete userInfo.dataValues.password;
      return res.status(200).send({ data: userInfo.dataValues, message: "ok" });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ data: null, message: "내부서버 오류입니다!" });
  }
};

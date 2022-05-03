const userAuthen = require("../authentication/userAuthen");

module.exports = async (req, res) => {
  const userInfo = await userAuthen(req, res);
  try {
    if (!userInfo) {
      return res
        .status(401)
        .send({ data: null, message: "먼저 로그인을 해주세요!" });
    } else {
      return res
        .cookie("accessToken", null, { maxAge: 0 })
        .status(200)
        .send({ data: null, message: "Logout is Success!" });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ data: null, message: "내부서버 오류입니다!" });
  }
};

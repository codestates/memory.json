const userAuthen = require("../authentication/userAuthen");

module.exports = async (req, res) => {
  const userInfo = await userAuthen(req, res);

  if (!userInfo) {
    res.status(401).send({ data: null, message: " 권한이 없습니다" });
  } else {
    res
      .cookie("accessToken", null, { maxAge: 0 })
      .status(200)
      .send({ data: null, message: "로그아웃이 정상적으로 완료되었습니다." });
  }
};

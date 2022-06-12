const { user } = require("../../models");
const userAuthen = require("../authentication/userAuthen");

module.exports = async (req, res) => {
  try {
    // 유저 인증
    const userInfo = await userAuthen(req, res);
    if (!userInfo) {
      return res.status(401).json({
        data: null,
        message: "먼저 로그인 해주세요!",
      });
    }
    // 사진전송 확인
    // console.log("req.file", req.file);

    // DB에 사진 등록
    const photoInfo = await user.update(
      {
        profile: req.file.location,
      },
      {
        where: {
          id: userInfo.dataValues.id
        },
      }
    );
    // console.log(photoInfo);

    return res.status(201).json({
      data: photoInfo,
      message: "사진 등록이 성공하였습니다"
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      data: null,
      message: "내부서버 오류입니다!",
    });
  }
};

const { history, user } = require("../../models");

module.exports = async (req, res) => {
  try {
    // 토큰 확인
    /* const userInfo = await userAuthen(req, res); */

    // 패스 파라미터를 조회한다.
    const user_id = req.params.userId;
    console.log(user_id);

    // 패스 파라미터와 user_id와 일치하는 유저가 쓴 히스토리들을 조회
    const historyInfoByUser = await history.findAll({
      where: { user_id },
    });
    console.log(historyInfoByUser);

    // 성공 결과를 200으로 리턴
    return res.status(200).json({
      data: historyInfoByUser,
      message: "history 목록 조회 성공!",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      data: null,
      message: "내부서버 오류입니다!",
    });
  }
};

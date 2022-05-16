const { history, user } = require("../../models");
// const userAuthen = require("../authentication/userAuthen");

module.exports = async (req, res) => {
  try {
    // 토큰 확인
    // const userInfo = await userAuthen(req, res);

    // 패스 파라미터를 조회한다.
    const user_id = req.params.userId;
    console.log("user_id",user_id);

    // 쿼리 스트링을 조회한다.
    console.log(req.query)
    const pageNumber = req.query.page;
    console.log("pageNumber",pageNumber)

    let offset = 0;

    if (pageNumber > 1) {
      offset = 2 * (pageNumber - 1); // 두개씩 잘라 보여줌.
    }


    // 패스 파라미터와 user_id와 일치하는 유저가 쓴 히스토리들을 조회
    const historyInfoByUser = await history.findAndCountAll({
      raw: true,
      where: { user_id },
      offset,
      limit: 2
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

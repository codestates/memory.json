const { history } = require("../../models");
const userAuthen = require("../authentication/userAuthen");

module.exports = async (req, res) => {
  try {
    // 유저 인증 확인
    const userInfo = await userAuthen(req, res);
    // 유저 인증에 실패하면 에러 상태코드 401 리턴
    if (!userInfo) {
      return res.status(401).json({
        data: null,
        message: "먼저 로그인 해주세요!",
      });
    }
    // console.log(userInfo.dataValues.id);

    // 패스 파마미터를 불러옴.
    const history_id = req.params.historyId;
    // console.log(history_id);

    //history_id가 있으면 DB에 있는지 조회
    let historyInfo;
    if (history_id) {
      historyInfo = await history.findOne({
        where: { id: history_id },
      });
    }
    // console.log(historyInfo);

    // 만약 DB에 없으면 404 오류 리턴
    if (!historyInfo) {
      return res.status(404).json({
        data: null,
        message: "올바르지 않은 history를 삭제하려 합니다!",
      });
    }

    // history의 user_id와 현재 토큰으로 로그인한 id가 같은지 판별하고
    // 다르면 권한이 없으므로 403 오류 리턴
    if (historyInfo.dataValues.user_id !== userInfo.dataValues.id) {
      return res.status(403).json({
        data: null,
        message: "다른 사람의 history를 수정하려 하나요?",
      });
    }

    // DB에서 history 삭제
    await history.destroy({
      where: {id: history_id }
    });

    //응답 보냄
    return res.status(200).json({
      data: {
        historyId: history_id,
      },
      message: `${history_Id} 번 히스토리 정보 삭제 성공!`
    })

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      data: null,
      message: "내부서버 오류입니다!",
    });
  }
};

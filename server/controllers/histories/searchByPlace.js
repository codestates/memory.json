const { place, history, favorite } = require("../../models");

module.exports = async (req, res) => {
  try {
    // 파라미터 조회
    const place_id = req.params.placeId;
    // console.log(placeId);

    //place_id가 있으면 DB에 있는지 조회
    let placeInfo;
    if (place_id) {
      placeInfo = await place.findOne({
        where: { id: place_id },
      });
    }
    // 만약 DB에 없으면 404 오류 리턴
    if (!placeInfo) {
      return res.status(404).json({
        data: null,
        message: "올바르지 않은 장소에서 조회하려합니다!",
      });
    }

    // place_id에 해당하는 history의 정보들을 모두 찾음
    const historyInfo = await history.findAll({
      raw: true,
      where: { place_id },
    });
    // console.log(historyInfo);

    //historyInfo배열을 돌며 id를 통해 favorites 테이블에서 좋아요 받은 길이를 가져오기 위해
    // 우선 historyInfo 에서 id만 빼냄
    const test1 = historyInfo.map((el) => {
      return el["id"];
    });
    console.log(test1);

    // 그 id를 가지고  favorites 테이블에서 history_id와 일치하는 컬럼의 개수를 각각 반환

    // place_id에 해당하는 좋아요 수 가져옴
    /* const test1 = historyInfo.map((el, idx) => {
      el[`test${idx}`] = `test${idx}`
      return el
    })
    console.log(test1);
 */
    // 리턴
    res.status(200).json({
      data: historyInfo,
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

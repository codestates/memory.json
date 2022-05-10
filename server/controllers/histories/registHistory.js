const { history, place, photo } = require("../../models");
const userAuthen = require("../authentication/userAuthen");


module.exports = async (req, res) => {
  try {
    // 유저 인증 확인
    // const userInfo = await userAuthen(req, res);
    // 유저 인증에 실패하면 에러 상태코드 401 리턴
    // console.log(userInfo)
    // if (!userInfo) {
    //   return res.status(401).json({
    //     data: null,
    //     message: "먼저 로그인 해주세요!",
    //   });
    // }
    // console.log(userInfo)

    // 파라미터 조회
    // const place_id = req.params.placeId;
    // console.log(place_id);

    // 만약 패스 파라미터로 placeId가 없으면 먼저 새로 place를 만듦 => 체크 필요
    /* if (!place_id) {
      return res.send("파라미터 새등록 만들기!");
    } else {
      //placeId가 있으면 DB에 있는지 조회
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
          message: "올바르지 않는 장소에 히스토리를 작성하려합니다!",
        });
      }
    } */

    console.log(req.body)

    // body 내용 조회
    const historyBody = JSON.parse(req.body.historyInfo);
    // console.log(historyBody);

    const { history_title, history_content, history_year } = historyBody;
    // 만약 바디에 정보가 없으면 401 오류 리턴
    if (!history_title || !history_content || !history_year) {
      return res.status(400).json({
        data: null,
        message: "history 등록 정보를 올바르게 입력했는지 확인해주세요!",
      });
    }

    // placeId가 있으면 히스토리 등록
    const historyInfo = await history.create({
      place_id: 1001, // place_id 는 임시
      // user_id: userInfo.dataValues.id,
      user_id: 1001, // user_id는 임시
      history_title,
      history_content,
      history_year,
    });
    console.log(historyInfo.dataValues);

    //DB에 사진 등록

    const photoPaths = req.files.map((el) => {
      return (
        {
          history_id: 1001, // 임시
          image_name: el.location
        }
      )
    })
    // console.log(photoPaths)

    let photoInfo = await photo.bulkCreate(photoPaths)
    // console.log(photoInfo)
    photoInfo = photoInfo.map((el) => {
      return el.dataValues
    })
    console.log(photoInfo)


    return res.status(201).json({
      data: {
        historyInfo: historyInfo.dataValues,
        photoInfo: photoInfo 
      },
      message: "새로운 history 등록 성공!",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      data: null,
      message: "내부서버 오류입니다!",
    });
  }
};

const axios = require("axios");
const qs = require("qs");
const { user } = require("../../models");
const {
  generateAccessToken,
  sendAccessToken
} = require('../tokenFunctions');
require("dotenv").config();

module.exports = async (req, res) => {
  // console.log(req.body.authorizationCode);
  try {
    const { authorizationCode } = req.body;
    // bodyData를 담고
    const bodyData = {
      grant_type: "authorization_code",
      client_id: process.env.KAKAO_ID,
      redirect_uri: "http://localhost:3000/mypage",
      code: authorizationCode,
    };
    // console.log(bodyData)

    //그것을 JSON 형식이 아니라 쿼리 문으로 변환해줌.
    // 이거 이해안되면 qs라는 모듈 까아서 쿼리문으로 바꿔야됨!
    // const queryStringBody = Object.keys(bodyData)
    // .map(k=> encodeURIComponent(k)+"="+encodeURI(bodyData[k]))
    // .join("&")
    // console.log(queryStringBody)
    /* grant_type=authorization_code&
    client_id=ebddf51f098fb6d9a16ffce5dc300b32&
    redirect_uri=http://localhost:3000/mypage&
    code=cawQ7hLfaU8lejPIeSi7ZAfSLsVHQnYqtAoKRlpudr7GU5mj-e3-94MlQLHzivYLKOcb2Qo9c5sAAAGAa6HCJw */
    // console.log(qs.stringify(bodyData))

    // 인가코드를 가지고 kakao 측에 토큰 요청
    const kakaoTokenRes = await axios({
      method: "POST",
      url: "https://kauth.kakao.com/oauth/token",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify(bodyData),
    });
    // console.log(kakaoTokenRes);

    // 카카오 토큰을 변수로 선언 후 값 할당
    const kakaoAccessToken = kakaoTokenRes.data.access_token;
    // console.log(kakaoAccessToken) 확인 완료

    // 카카오 토큰을 다시 보내 정보 해석하게 함
    const tokenUserRes = await axios({
      method: "GET",
      url: "https://kapi.kakao.com/v2/user/me",
      headers: {
        Authorization: `Bearer ${kakaoAccessToken}`,
      },
    });
    // console.log(tokenUserRes.data);

    // 카카오에서 보낸 정보를 바탕으로 회원가입을 시키고 우리만의 토큰을 만듦.
    // 그러기위해 DB에 일치하는 데이터가 있는지 확인한다.
    const { email, profile } = tokenUserRes.data.kakao_account;
    const kakaoUniqueId = tokenUserRes.data.id;

    const userInfo = await user.findOne({
      where: { email },
    });

    // 회원이 존재하지 않는 경우 DB에 데이터 추가 후 로그인 처리
    if (!userInfo) {
      const newUserInfo = await user.create({
        user_name: profile.nickname,
        email,
        provider: "kakao",
        // uniqueId: kakaoUniqueId, !!!!!!!!!!!!!!!!!!!!!!!
      });
      // console.log(newUserInfo);

      // 토큰을 발급하고 쿠키에 저장한다.
      const newAccessToken = generateAccessToken({
        id: newUserInfo.dataValues.id,
      });
      sendAccessToken(res, newAccessToken);
      
      // 응답 전송
      return res.status(201).json({
        data: {
          accessToken: newAccessToken
        },
        message: "ok"
      })
    } 

    // 회원이 존재하는 경우 로그인 처리
    // const newAccessToken = getAccessToken()

  
    

    res.send("소셜로그인");
    // 카카오 구현
  } catch (err) {
    console.error(err);
  }
};

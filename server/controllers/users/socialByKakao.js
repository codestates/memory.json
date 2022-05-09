const axios = require("axios");
const qs = require("qs");
const { user } = require("../../models");
const { generateAccessToken, sendAccessToken } = require("../tokenFunctions");
require("dotenv").config();

module.exports = async (req, res) => {
  console.log(req.body.authorizationCode);
  try {
    console.log("hello");
    const { authorizationCode } = req.body;
    // bodyData를 담고
    const bodyData = {
      grant_type: "authorization_code",
      client_id: process.env.KAKAO_ID,
      redirect_uri: process.env.KAKAO_REDIRECT_URI,
      code: authorizationCode,
    };
    console.log(bodyData)

    // 인가코드를 가지고 kakao 측에 토큰 요청
    const kakaoTokenRes = await axios({
      method: "POST",
      url: "https://kauth.kakao.com/oauth/token",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify(bodyData),
    });
    console.log(kakaoTokenRes);

    // 카카오 토큰을 변수로 선언 후 값 할당
    const kakaoAccessToken = kakaoTokenRes.data.access_token;
    console.log(kakaoAccessToken) 

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
    const social_id = tokenUserRes.data.id;

    const userInfo = await user.findOne({
      where: { social_id: social_id },
    });

    /**
     *
     * [회원이 존재하지 않는 경우 로그인 처리]
     *
     */
    if (!userInfo) {
      const newUserInfo = await user.create({
        user_name: profile.nickname,
        email,
        social_id: social_id,
        provider: "kakao",
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
          accessToken: newAccessToken,
        },
        message: "ok",
      });
    }

    /**
     *
     * [회원이 존재하는 경우 로그인 처리]
     *
     */

    // 토큰을 발급하고 쿠키에 저장한다.
    const accessToken = generateAccessToken(userInfo.dataValues);
    sendAccessToken(res, accessToken);

    return res.status(200).json({
      data: {
        accessToken,
      },
      message: "Login Success!",
    });

    // 카카오 구현
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      data: null,
      message: "내부서버 오류입니다!",
    });
  }
};

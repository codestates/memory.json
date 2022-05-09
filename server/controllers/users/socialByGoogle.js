const { user } = require("../../models");
const axios = require("axios");
const dotenv = require("dotenv");
const {generateAccessToken, sendAccessToken} = require('../tokenFunctions')
dotenv.config();

module.exports = async (req, res) => {
  try {
    const googleClientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
    const googleSecret = process.env.GOOGLE_OAUTH_SECRET;
    const googleRedirectUri = process.env.GOOGLE_REDIRECT_URI;

    if (!req.body.authorizationCode) {
      res
        .status(400)
        .send({ data: null, message: "authorizationCode가 없습니다!" });
    }
    const code = req.body.authorizationCode;

    // console.log(req)
    const socialToken = await axios({
      method: "post",
      url: `https://oauth2.googleapis.com/token?client_id=${googleClientId}&client_secret=${googleSecret}&code=${code}&redirect_uri=${googleRedirectUri}&grant_type=authorization_code`,
      headers: {
        accept: "application/json",
      },
    });

    // console.log(socialToken)
    const access_token = socialToken.data.access_token;
    // console.log(access_token)
    const socialInfo = await axios({
      method: "GET",
      url: `https://www.googleapis.com/oauth2/v2/userinfo`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    // console.log(socialInfo)
    const social_id = socialInfo.data.id
    // console.log(social_id)
    // console.log(socialInfo)
    const sameAccount = await user.findOne({
      where: {
        social_id: social_id,
      }
    })
    // console.log(sameAccount)
    // console.log(socialInfo.data)
    if (!sameAccount) {
      user.create({
            user_name: socialInfo.data.name,
            social_id: social_id,
            email: socialInfo.data.email,
            provider: 'google'
          }).then(data=>{
            const accessToken = generateAccessToken({id: data.dataValues.id})
            sendAccessToken(res,accessToken);
            return res.status(200).send({accessToken: accessToken, message: '회원가입 및 로그인 완료'})
          })
    } else {
      const accessToken = generateAccessToken({id: sameAccount.dataValues.id})
      sendAccessToken(res,accessToken)
      return res.status(200).send({accessToken: accessToken, message: '기존회원 로그인 완료'})
    }
    // return res.send({ data: socialInfo.data, message: "ok" });
  } catch (err) {
    console.error(err);
  }
};

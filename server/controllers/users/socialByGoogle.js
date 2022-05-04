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
    console.log(social_id)
    const sameAccount = await user.findOne({
      where: {
        social_id: social_id,
      }
    })
    console.log(sameAccount)
    if (!sameAccount) {
      user.create({
            user_name: socialInfo.name,
            social_id: social_id,
            email: socialInfo.email,
          }).then(data=>{
            const accessToken = generateAccessToken({id: data.dataValues.id})
            const cookieOptions = {
              maxAge: 1000 * 60 * 60 * 24 * 7,
              httpOnly: true
            };
            res.cookie('accessToken', accessToken, cookieOptions);
            return res.status(200).send({data:data.dataValues, message: 'ok'})
          })
    } else {
      const accessToken = generateAccessToken({id: sameAccount.dataValues.id})
      const cookieOptions = {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
      };
      res.cookie('accessToken', accessToken, cookieOptions);
      return res.status(200).send({data:data.dataValues, message: 'ok'})
    }
    // return res.send({ data: socialInfo.data, message: "ok" });
  } catch (err) {
    console.error(err);
  }
};

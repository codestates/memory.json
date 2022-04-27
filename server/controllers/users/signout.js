const { user } = require('../../models');
const userAuthen = require('../authentication/userAuthen');
const { sendAccessToken } = require('../tokenFunctions')

module.exports = async (req, res) => {
    // res.send('유저정보')
  const accessTokenData = await userAuthen(req,res);
  console.log(accessTokenData)
  console.log(req)

  if (!accessTokenData) {
    res.status(401).send({ data: null, message: " 권한이 없습니다" });
  } else {
    sendAccessToken(res,accessTokenData.dataValues.username)
  }
};
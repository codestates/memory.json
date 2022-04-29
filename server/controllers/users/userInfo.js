const userAuthen = require('../authentication/userAuthen');

module.exports = async (req, res) => {
    // res.send('유저정보')
  const userInfo= await userAuthen(req,res);

  if (!userInfo) {
    res.status(401).send({ data: null, message: " 권한이 없습니다" });
  } else {
    delete userInfo.dataValues.password;
    res.status(200).send({ data: userInfo.dataValues, message: 'ok' })
  }
};

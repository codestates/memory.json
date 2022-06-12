require('dotenv').config();
const { sign } = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: '1d' });
  },

  sendAccessToken: (res, accessToken) => {
    res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
  },

  sendAccessTokenWithUserInfo: (res, accessToken, data) => {
    res.send({
      data: { accessToken: accessToken, userInfo: data },
      message: 'ok',
    });
  },
};

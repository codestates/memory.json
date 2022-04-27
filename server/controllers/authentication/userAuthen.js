const { user } = require('../../models')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async (req, res) => {
  try {
    const authorization = req.headers['authorization'];
    // token 내용을 분리
    const accessToken = authorization.split(' ')[1];
    // 헤더에 액세스 토큰이 담겨있지 않다면 401 오류
    if (!accessToken) {
      return null;
    };

    // 토큰 테스트용
    /* const { accessToken }= req.cookies;

    if (!accessToken) {
      return null;
    } */


    // 액세스 토큰이 유효한지 검사하는 함수 구성 
    const checkAccessToken = (accessToken) => {
      return jwt.verify(accessToken, process.env.ACCESS_SECRET);
    } 
    
    const accessTokenData = checkAccessToken(accessToken);
    // 토큰이 유효하지 않을때
    if (!accessTokenData) {
      return null;
    };

    // 액세스 토큰 정보가 유효한지 확인 : 토큰 구성할떄 테이블 고유 id로 구성
    const user_id  = accessTokenData.id;
    // DB에서 확인
    const userInfo = await user.findOne({
      where: { id: user_id }
    });

    // 만약 DB와 일치하는 정보가 없다면
    if (!userInfo) {
      return null;
    };

    // 모든 인증 절차가 끝났다면 userInfo 반환
    return userInfo;
    
  } catch (err) {
    console.error(err);
    // 서버에러
    return null;
  }
}
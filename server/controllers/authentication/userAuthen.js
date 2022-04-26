const { user } = require('../../models')
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  try {
    const authorization = req.headers['authorization'];
    // token 내용을 분리
    const accessToken = authorization.split(' ')[1];
    // 헤더에 액세스 토큰이 담겨있지 않다면 401 오류
    if (!accessToken) {
      return res.status(403).json({
        data: null,
        message: '권한이 없습니다!'
      });
    };

    // 액세스 토큰이 유효한지 검사하는 함수 구성 
    const checkAccessToken = (accessToken) => {
      return jwt.verify(accessToken, ACCESS_SECRET);
    } 
    
    const accessTokenData = checkAccessToken(accessToken);
    // 토큰이 유효하지 않으면 401 오류
    if (!accessTokenData) {
      return res.status(403).json({
        data: null,
        message: '권한이 없습니다!',
      });
    };

    // 액세스 토큰 정보가 유효한지 확인 : 토큰 구성할떄 id로 할것인가 user_id로 할것인가 확인 우선은 id
    const user_id  = accessTokenData.id;
    // DB에서 확인
    const userInfo = await user.findOne({
      where: { id: user_id }
    });

    // 만약 DB와 일치하는 정보가 없다면 403 반환 
    if (!userInfo) {
      return res.status(403).json({
        data: null,
        message: '권한이 없습니다!'
      });      
    };

    // 모든 인증 절차가 끝났다면 userInfo 반환
    return userInfo;
  } catch (err) {
    console.error(err);
    // 서버에러
    return res.status(500).json({
      data: null,
      message: '내부 서버 오류입니다!'
    })
  }
}
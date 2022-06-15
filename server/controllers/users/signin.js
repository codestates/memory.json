const bcrypt = require('bcrypt');
const { user } = require('../../models');
const {
  generateAccessToken,
  sendAccessToken
} = require('../tokenFunctions');
const dotenv = require('dotenv');
dotenv.config();
const logger = require("../../config/winston");

module.exports = async (req, res) => {
  try{
    const { user_account, password } = req.body;
    // body의 필수 내용이 없을경우 에러 상태코드 400 리턴
    if (!user_account || !password) {
      return res.status(400).json({
        data: null,
        message: '로그인 정보를 확인해주세요!'
      });
    };
  
    // req,body의 user_account로 db에서 userInfo 조회
    const userInfo = await user.findOne({
      where: { user_account }
    })
    // 만약 입력받은 user_account가 DB에 없으면 에러 상태코드 401 리턴
    if (!userInfo) {
      return res.status(401).json({
        data: null,
        message: '허가되지 않은 로그인입니다!'
      });
    };
    // 등록된 회원이 존재한다면 비밀번호를 확인
    const match = await bcrypt.compare(password, userInfo.dataValues.password);
    // 비밀번호가 DB과 일치하지 않다면 에러 상태코드 403 리턴
    console.log(match)
    if (!match) {
      return res.status(401).json({
        data: null,
        message: '비밀번호가 틀립니다!'
      });
    };
    
  
  
    // users 테이블 고유 id와 user_account를 담아 토큰을 생성 후 클라이언트에 저장함
    const accessToken = generateAccessToken({
      id: userInfo.dataValues.id,
    });
    // console.log(accessToken);
  
    //토큰이 잘 담겨 있는지 확인 테스트용
    /* const checkAccessToken = (accessToken) => {
      return jwt.verify(accessToken, process.env.ACCESS_SECRET);
    } 
    
    const accessTokenData = checkAccessToken(accessToken);
    console.log(accessTokenData) */
  
    // 토큰 쿠키로 보냄
    sendAccessToken(res, accessToken);
    
    // 성공 응답
    logger.info(`userId ${userInfo.dataValues.id}가 로그인하였습니다.`)
    return res.status(200).json({
      data: { accessToken },
      message: "Login Success!"
    });

  } catch (err) {
    // 서버 에러
    console.error(err);
    return res.status(500).json({
      data: null,
      message: '내부서버 오류입니다!'
    });
  }
}
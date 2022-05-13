const bcrypt = require('bcrypt');
const userAuthen = require('../authentication/userAuthen');
const { user } = require('../../models');
const {
  generateAccessToken,
  sendAccessToken,
  sendAccessTokenWithUserInfo
} = require('../tokenFunctions'); 

module.exports = async (req, res) => {
  try {
    // 유저 인증 확인
    const userInfo = await userAuthen(req, res);
  
    // 유저 인증에 실패하면 에러 상태코드 401 리턴
    if (!userInfo) {
      return res.status(401).json({
        data: null,
        message: '먼저 로그인 해주세요!'
      });
    };
  
    // 유저 인증 토큰이 정상적이면
    // 요청받은 body의 데이터들을 불러옴
    const { password, mobile, email, age } = req.body;
    
    // 기존 패스워드와 DB의 패스워드가 다를때 실패 메세지가 떠야하는가? 질문
    // 만약 패스워드가 바디로 들어오면 비밀번호수정요청이니 새로운비밀번호를 다시 해쉬함.
    let hashNewPassword;
    if (password) {
      hashNewPassword = await bcrypt.hash(password, 10);
    }
    // DB의 userInfo를 요청한 바디정보로 업데이트 함
    await user.update({
      password: hashNewPassword,
      mobile,
      email,
      age
    }, {
      where: {id: userInfo.id }
    })
    // 업데이트한 회원정보를 다시 찾는데 필요한 부분만 가져옴
    const newUserInfo = await user.findOne({
      attributes: [
        'mobile',
        'email',
        'address',
        'age'
      ],
      where: {
        id: userInfo.dataValues.id
      }
    });
    
    // 성공 응답
    return res.status(200).json({
      data: newUserInfo.dataValues,
      message: 'Update is Success!'
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
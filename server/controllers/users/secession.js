const userAuthen = require('../authentication/userAuthen');
const { user } = require('../../models');

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
    console.log(userInfo.dataValues);

    // DB에서 유저 삭제
    await user.destroy({
      where: {id: userInfo.dataValues.id }
    });
    // 토큰유효기간 삭제
    res.cookie('accessToken', null, { maxAge: 0 });
    
    // 질문) data를 {}을 null로 통일하지 않아도 괜찮은가. 
     return res.status(200).json({
       data: {},
       message: 'Users infomation is deleted!'
     });

  } catch(err) {
    //서버 에러
    console.error(err);
    return res.status(500).json({
      data: null,
      message: '내부서버 오류입니다!'
    });
  }
}
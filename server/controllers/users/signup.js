const { user } = require('../../models');
const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = async (req, res) => {
  let {
    user_name,
    user_account,
    password,
    mobile,
    email,
    address,
    age,
    sex,
  } = req.body;

  if (user_name === "" || user_account === "" || password === "") {
    return res.status(422).send({ data: null, message: '이름, 아이디, 비밀번호는 필수요구사항입니다.' });
  }

  if (typeof age !== 'number') {
    return res.status(422).send({ data: null, message: '나이는 숫자만 입력할 수 있습니다.' });
  }

  if (sex !== 'F' && sex !== 'M') {
    return res.status(422).send({ data: null, message: '성별은 "F" 또는 "M"만 입력할 수 있습니다.' });
  }

  const sameAccount = await user.findOne({ where: { user_account }});
  if (sameAccount) {
    return res.status(409).send({data: null, message: '이미 사용중인 아이디입니다.' });
  }
  
//   bcrypt.genSalt(saltRounds, (err, salt) => {
//     if (err) {
//       return res.status(500).send({ data: null, message: '비밀번호 해쉬화에 실패했습니다.' });
//     }
//     bcrypt.hash(password, salt, async (err, hash) => {
//       if (err) {
//         return res.status(500).send({ data: null, message: '비밀번호 해쉬화에 실패했습니다.' });
//       }
//       console.log(hash)
//       password = hash;


      user.create ({
        user_name: user_name,
        user_account: user_account,
        password: password,
        mobile: mobile,
        email: email,
        address: address,
        age: age,
        sex: sex,
      });
      return res.status(201).send({ data: null, message: `${user_name}님의 회원가입이 정상적으로 처리되었습니다.` });
//     });
//   });
};

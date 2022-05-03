const { user } = require("../../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = async (req, res) => {
  try {
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
      return res.status(400).send({
        data: null,
        message: "필수 회원정보를 입력했는지 확인해주세요!",
      });
    }

    if (typeof age !== "number" && age !== "") {
      return res
        .status(422)
        .send({ data: null, message: "나이는 숫자만 입력할 수 있습니다." });
    }

    if (sex !== "" && sex !== "F" && sex !== "M") {
      return res.status(422).send({
        data: null,
        message: '성별은 "F" 또는 "M"만 입력할 수 있습니다.',
      });
    }

    const sameAccount = await user.findOne({ where: { user_account } });
    if (sameAccount) {
      return res
        .status(409)
        .send({ data: null, message: "이미 존재하는 회원가입정보입니다!" });
    }

    bcrypt.genSalt(saltRounds, async (err, salt) => {
      if (err) {
        return res
          .status(500)
          .send({ data: null, message: "내부서버 오류입니다!" });
      }
      await bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          return res
            .status(500)
            .send({ data: null, message: "내부서버 오류입니다!" });
        }

        password = hash;

        user
          .create({
            user_name: user_name,
            user_account: user_account,
            password: password,
            mobile: mobile,
            email: email,
            address: address,
            age: age,
            sex: sex,
          })
          .then((data) => {
            delete data.dataValues.password;
            return res.status(201).send({
              data: data.dataValues,
              message: `회원가입이 성공적으로 완료되었습니다!`,
            });
          })
          .catch((err) => {
            return res
              .status(400)
              .send({ data: null, message: "회원가입에 실패하였습니다." });
          });
      });
    });
  } catch (err) {
    return res.send(500).send({ data: null, message: "내부서버 오류입니다!" });
  }
};

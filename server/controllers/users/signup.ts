const { user } = require("../../models");
import * as  bcrypt from "bcrypt";
const saltRounds = 10;

module.exports = async (req: any, res: any) => {
  try {
    // let {
    //   user_name,
    //   user_account,
    //   password,
    //   mobile,
    //   email,
    //   address,
    //   age,
    //   sex,
    // } = req.body;

    interface Userbody {
      user_name: string;
      user_account: string;
      password: string;
      mobile?: string;
      email?: string;
      address?: string;
      age?: number;
      sex?: string;
    }

    let {
      user_name,
      user_account,
      password,
      mobile,
      email,
      address,
      age,
      sex,
    }: Userbody = req.body;

    if (user_name === "" || user_account === "" || password === "") {
      return res.status(400).send({
        data: null,
        message: "필수 회원정보를 입력했는지 확인해주세요!",
      });
    }

    const sameAccount = await user.findOne({ where: { user_account } });
    if (sameAccount) {
      return res
        .status(409)
        .send({ data: null, message: "이미 존재하는 회원가입정보입니다!" });
    }

    bcrypt.genSalt(saltRounds, async (err: any, salt: any) => {
      if (err) {
        return res
          .status(500)
          .send({ data: null, message: "내부서버 오류입니다!" });
      }
      await bcrypt.hash(password, salt, (err: any, hash: any) => {
        if (err) {
          return res
            .status(500)
            .send({ data: null, message: "내부서버 오류입니다!" });
        }

        password = hash;

        user
          .create({
            user_name,
            user_account,
            password,
            mobile,
            email,
            address,
            age,
            sex,
          })
          .then((data: any) => {
            delete data.dataValues.password;
            return res.status(201).send({
              data: data.dataValues,
              message: `회원가입이 성공적으로 완료되었습니다!`,
            });
          })
          .catch((err: any) => {
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

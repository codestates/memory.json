"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("users", [
      {
        id: 1001,
        user_name: "김갑판",
        user_account: "test1",
        password: "testpassword",
        mobile: "010-2020-2212",
        email: "test1@naver.com",
        address: "testaddress1",
        age: 35,
        sex: "F",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1002,
        user_name: "김돌쇠",
        user_account: "test2",
        password: "testpassword2",
        mobile: "010-2020-2212",
        email: "test2@naver.com",
        address: "testaddress2",
        age: 31,
        sex: "F",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1003,
        user_name: "김문석",
        user_account: "test3",
        password: "testpassword3",
        mobile: "010-2020-2215",
        email: "test3@naver.com",
        address: "testaddress3",
        age: 21,
        sex: "M",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("places", [
      {
        id: 1001,
        user_id: 1001,
        place_address: "서울특별시 용산구 한강대로 405",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1002,
        user_id: 1001,
        place_address: "서울특별시 용산구 인중로 405",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1003,
        user_id: 1002,
        place_address: "서울특별시 중구 덕대로 11",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("histories", [
      {
        id: 1001,
        place_id: 1001,
        user_id: 1001,
        history_title: "히스토리 제목1",
        history_content: "히스토리 내용1",
        history_year: 1989,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1002,
        place_id: 1001,
        user_id: 1002,
        history_title: "히스토리 제목2",
        history_content: "히스토리 내용2",
        history_year: 1989,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1003,
        place_id: 1002,
        user_id: 1003,
        history_title: "히스토리 제목3",
        history_content: "히스토리 내용3",
        history_year: 1990,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("comments", [
      {
        id: 1001,
        history_id: 1001,
        user_id: 1001,
        comment_content: "댓글내용1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1002,
        history_id: 1001,
        user_id: 1002,
        comment_content: "댓글내용2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1003,
        history_id: 1002,
        user_id: 1003,
        comment_content: "댓글내용1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("photos", [
      {
        id: 1001,
        history_id: 1001,
        image_name: "test1",
        thumbnail: "F",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1002,
        history_id: 1001,
        image_name: "test2",
        thumbnail: "T",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1003,
        history_id: 1002,
        image_name: "test3",
        thumbnail: "F",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("favorites", [
      {
        id: 1001,
        history_id: 1001,
        user_id: 1001,
        like: "T",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1002,
        history_id: 1001,
        user_id: 1002,
        like: "T",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1003,
        history_id: 1002,
        user_id: 1001,
        like: "F",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("places", null, {});
    await queryInterface.bulkDelete("histories", null, {});
    await queryInterface.bulkDelete("comments", null, {});
    await queryInterface.bulkDelete("photos", null, {});
    await queryInterface.bulkDelete("favorites", null, {});
  },
};

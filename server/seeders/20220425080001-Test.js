'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        user_name: "김갑판",
        user_account: "test1",
        password: "testpassword",
        mobile: "010-2020-2212",
        email: "test1@naver.com",
        address: "testaddress1",
        age: 35,
        sex: "F",
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        id: 2,
        user_name: "김돌쇠",
        user_account: "test2",
        password: "testpassword2",
        mobile: "010-2020-2212",
        email: "test2@naver.com",
        address: "testaddress2",
        age: 31,
        sex: "F",
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        id: 3,
        user_name: "김문석",
        user_account: "test3",
        password: "testpassword3",
        mobile: "010-2020-2215",
        email: "test3@naver.com",
        address: "testaddress3",
        age: 21,
        sex: "M",
        createdAt: new Date,
        updatedAt: new Date
      },
    ])


  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {})
  }
};

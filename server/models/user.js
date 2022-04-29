module.exports = (sequelize, DataTypes)=>{
  const user = sequelize.define('user', { 
    user_name: {
      type:DataTypes.STRING(100),
      allowNull: false //필수값
    },
    user_account: {
      type:DataTypes.STRING(100),
      allowNull: false //필수값
    },
    password: {
      type:DataTypes.STRING(200),
      allowNull: false //필수값
    },
    mobile: {
      type:DataTypes.STRING(20) 
    },
    email: {
      type:DataTypes.STRING(50)
    },
    address: {
      type:DataTypes.STRING(255)
    },
    age: {
      type:DataTypes.INTEGER
    },
    sex: {
      type:DataTypes.CHAR(1)
    }
  },{
      // 한글을 쓸수 있게 해준다.(한글 저장)
      charset: 'utf8',
      collate: 'utf8_general_ci',
  });

  user.associate = (db) => {
    db.user.hasMany(db.comment, {
      foreignKey: "user_id",
      sourceKey: "id"
    })
    db.user.hasMany(db.favorite, {
      foreignKey: "user_id",
      sourceKey: "id"
    })
    db.user.hasMany(db.history, {
      foreignKey: "user_id",
      sourceKey: "id"      
    })
    db.user.hasMany(db.place, {
      foreignKey: "user_id",
      sourceKey: "id",
    })
  };
  
  return user;
}
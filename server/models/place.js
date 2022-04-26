module.exports = (sequelize, DataTypes)=>{
  const place = sequelize.define('place', { 
    user_id: {
      type:DataTypes.INTEGER,
      allowNull: false //필수값
    },
    place_name: {
      type:DataTypes.CHAR(200),
      allowNull: false //필수값
    },
    place_address: {
      type:DataTypes.CHAR(200),
      allowNull: false //필수값
    },
    place_location: {
      type:DataTypes.STRING(255),
      allowNull: false //필수값
    }
  },{
      // 한글을 쓸수 있게 해준다.(한글 저장)
      charset: 'utf8',
      collate: 'utf8_general_ci',
  });

  place.associate = (db) => {
    db.place.hasMany(db.history, {
      foreignKey: "place_id",
      sourceKey: "id"
    })
    db.place.belongsTo(db.user, {
      foreignKey: "user_id",
      sourceKey: "id"      
    })
  }

  return place;
}
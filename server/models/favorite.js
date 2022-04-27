module.exports = (sequelize, DataTypes)=>{
  const favorite = sequelize.define('favorite', { 
    history_id: {
      type:DataTypes.INTEGER,
      allowNull: false //필수값
    },
    user_id: {
      type:DataTypes.INTEGER,
      allowNull: false //필수값
    },
    like: {
      type:DataTypes.CHAR(1),
      allowNull: false //필수값
    }
  },{
      // 한글을 쓸수 있게 해준다.(한글 저장)
      charset: 'utf8',
      collate: 'utf8_general_ci',
  });

  favorite.associate = (db) => {
    db.favorite.belongsTo(db.user, {
      foreignKey: "user_id",
      sourceKey: "id"
    })
    db.favorite.belongsTo(db.history, {
      foreignKey: "history_id",
      sourceKey: "id",
      onDelete: "CASCADE"
    })
  }
  
  return favorite;
}
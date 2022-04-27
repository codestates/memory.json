module.exports = (sequelize, DataTypes)=>{
  const photo = sequelize.define('photo', { 
    history_id: {
      type:DataTypes.INTEGER,
      allowNull: false //필수값
    },
    image_name: {
      type:DataTypes.STRING(255),
      allowNull: false //필수값
    },
    thumbnail: {
      type:DataTypes.CHAR(1),
    }
  },{
      // 한글을 쓸수 있게 해준다.(한글 저장)
      charset: 'utf8',
      collate: 'utf8_general_ci',
  });

  photo.associate = (db) => {
    db.photo.belongsTo(db.history, {
      foreignKey: "history_id",
      sourceKey: "id",
      onDelete: "CASCADE"
    })
  }

  return photo;
}
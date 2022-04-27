module.exports = (sequelize, DataTypes)=>{
  const history = sequelize.define('history', { 
    place_id: {
      type:DataTypes.INTEGER,
      allowNull: false //필수값
    },
    user_id: {
      type:DataTypes.INTEGER,
      allowNull: false //필수값
    },
    history_title: {
      type:DataTypes.STRING(100),
      allowNull: false //필수값
    },
    history_content: {
      type:DataTypes.STRING(200),
    },
    history_year: {
      type:DataTypes.INTEGER,
      allowNull: false //필수값
    }
  },{
      // 한글을 쓸수 있게 해준다.(한글 저장)
      charset: 'utf8',
      collate: 'utf8_general_ci',
      // 실제 테이블명을 histories로 바꿈
      tableName: 'histories'
  });

  history.associate = (db) => {
    db.history.hasMany(db.comment, {
      foreignKey: "history_id",
      sourceKey: "id"      
    })
    db.history.hasMany(db.favorite, {
      foreignKey: "history_id",
      sourceKey: "id"      
    })
    db.history.hasMany(db.photo, {
      foreignKey: "history_id",
      sourceKey: "id"      
    })
    db.history.belongsTo(db.user, {
      foreignKey: "user_id",
      sourceKey: "id",
      onDelete: "CASCADE"
    })
    db.history.belongsTo(db.place, {
      foreignKey: "place_id",
      sourceKey: "id",
      onDelete: "CASCADE"
    })
  }
  
  return history;
}
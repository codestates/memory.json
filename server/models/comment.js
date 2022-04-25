module.exports = (sequelize, DataTypes)=>{
  const comment = sequelize.define('comment', { 
    history_id: {
      type:DataTypes.INTEGER,
      allowNull: false //필수값
    },
    user_id: {
      type:DataTypes.INTEGER,
      allowNull: false //필수값
    },
    comment_content: {
      type:DataTypes.STRING(200),
      allowNull: false //필수값
    }

  },{
      // 한글을 쓸수 있게 해준다.(한글 저장)
      charset: 'utf8',
      collate: 'utf8_general_ci',
  });

  comment.associate = (db) => {
    db.comment.belongsTo(db.user, {
      foreignKey: "user_id",
      sourceKey: "id"
    })
    db.comment.belongsTo(db.history, {
      foreignKey: "history_id",
      sourceKey: "id"      
    })
  }

  return comment;
}
'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model
  class Task extends Model {}

  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please insert a task title!'
        },
      }
    },
    status: {
      type: DataTypes.STRING
    },
    subtitle: {
      type: DataTypes.STRING
    },
    deadline: {
      type: DataTypes.DATE
    },
    UserId: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    timestamps : false,
  })

  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.User)
  };
  return Task;
};
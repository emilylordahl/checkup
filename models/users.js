"use strict";
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    birthday: DataTypes.DATE,
    gender: DataTypes.STRING,
    pregnant: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return users;
};
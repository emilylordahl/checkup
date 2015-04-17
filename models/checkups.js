"use strict";
module.exports = function(sequelize, DataTypes) {
  var checkups = sequelize.define("checkups", {
    detail: DataTypes.STRING,
    complete: DataTypes.BOOLEAN,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return checkups;
};
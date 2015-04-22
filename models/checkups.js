'use strict';
module.exports = function(sequelize, DataTypes) {
  var checkups = sequelize.define('checkups', {
    tip: DataTypes.STRING,
    description: DataTypes.TEXT,
    complete: DataTypes.BOOLEAN
  }, {

    underscored: true,
    classMethods: {
      associate: function(models) {
        checkups.belongsToMany(models.users, { 
          through: 'checkups_users', 
          foreignKey: 'checkup_id' 
        });
      }
    }
  });
  return checkups;
};
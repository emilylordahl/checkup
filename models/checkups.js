'use strict';
module.exports = function(sequelize, DataTypes) {
  var checkups = sequelize.define('checkups', {
    tip: DataTypes.STRING,
    description: DataTypes.TEXT,
    complete: DataTypes.BOOLEAN,
    user_id: DataTypes.INTEGER
  }, {

    underscored: true,
    classMethods: {
      associate: function(models) {
        checkups.belongsTo(models.users, { foreignKey: 'user_id' });
      }
    }
  });
  return checkups;
};
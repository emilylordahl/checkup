"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("checkups", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      detail: {
        type: DataTypes.STRING
      },
      complete: {
        type: DataTypes.BOOLEAN
      },
      user_id: {
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("checkups").done(done);
  }
};
'use strict';
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('checkups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      tip: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.TEXT
      },
      complete: {
        type: DataTypes.BOOLEAN
      },
      user_id: {
        type: DataTypes.INTEGER
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable('checkups').done(done);
  }
};
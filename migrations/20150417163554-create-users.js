'use strict';
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      first_name: {
        type: DataTypes.STRING
      },
      last_name: {
        type: DataTypes.STRING
      },
      username: {
        unique: true,
        type: DataTypes.STRING
      },
      password_digest: {
        type: DataTypes.STRING
      },
      age: {
        type: DataTypes.INTEGER
      },
      gender: {
        type: DataTypes.STRING
      },
      pregnant: {
        type: DataTypes.BOOLEAN
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
    migration.dropTable('users').done(done);
  }
};
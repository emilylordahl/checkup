'use strict';
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define('users', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: { msg: 'Letters only please.' },
        notEmpty: { msg: 'Please enter your first name.' }
      } 
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: { msg: 'Letters only please.' },
        notEmpty: { msg: 'Please enter your last name.' }    
      }
    },
    username: {
     type: DataTypes.STRING,
     allowNull: false,
     validate: {
      isAlpha: { msg: 'Usernames can only include letters.' },
      notEmpty: { msg: 'Please enter a username.' }
     } 
    },
    password_digest: {
     type: DataTypes.STRING,
     allowNull: false,
     validate: {
      len: { args: [8,100], msg: 'Passwords must be 8 to 20 characters.'},
      // isAlphanumeric: { msg: 'Passwords must contain at least one letter and number.' },
      notEmpty: {  msg: 'Please create a password.' }
     } 
    },
    age: {
     type: DataTypes.INTEGER,
     allowNull: false,
     validate: {
      isInt: { msg: 'Please enter a number.'},
      max: { args: [120], msg: 'Your age cannot exceed 120.' },
      min: { args: [0], msg: 'Your age must be greater than 0.'},
      notEmpty: { msg: 'Please enter your age.' }
     } 
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: { args: [['male', 'female']], msg: 'Please enter male or female.' },
        notEmpty: { msg: 'Please select your gender.' }
      }  
    },
    pregnant: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        isFemale: function() {
          if ( (this.gender === 'female') && (this.age >= 11) ) {
            notEmpty: { msg: 'Are you pregnant? Please choose yes or no.' }
          }
        }
      }
    }
  }, {

    underscored: true,
    classMethods: {
      associate: function(models) {
        users.hasMany(models.checkups, { 
          foreignKey: 'user_id',
          onDelete: 'cascade',
          hooks: true
        });
      },
      getUserInfo: function() {
        return users.findOne({
          where: {
            age: this.age,
            gender: this.gender,
            pregnant: this.pregnant
          }
        });
      }
    }
  });
  return users;
};
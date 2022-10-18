'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
  userId: {
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
    nickname: DataTypes.STRING,
    password: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;       //return을 User라고 했으면 repository에서 불러올때도 user로 불러와야 됨
};
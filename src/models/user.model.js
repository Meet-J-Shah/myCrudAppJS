// eslint-disable-next-line no-unused-vars
const { DataTypes, Model, Optional } = require('sequelize');
const { sequelize } = require('.');
//const { UserInstance, UserCreationAttributes } = require('../interface');

class User extends Model {
  // The following property declarations were present in the TypeScript version:
  // id!: number;
  // email!: string;
  // password!: string;
  // role!: string;
}

User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
    email: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    password: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user',
    },
  },
  {
    sequelize,
    modelName: 'User',
  },
);

console.log(User === sequelize.models.User);

module.exports = User;

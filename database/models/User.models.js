const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');

const { sequelize } = require('./sequelize');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue:
        'https://res.cloudinary.com/twitter-clone-media/image/upload/v1597737557/user_wt3nrc.png',
    },
    bio: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    resetPasswordLink: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: 'User',
  }
);

module.exports = { User };

const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
module.exports = (sequelize, DataTyples) => {
  const admin = sequelize.define(
    "admins",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      alias_admin: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      password_admin: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      img_perfil: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return admin;
};

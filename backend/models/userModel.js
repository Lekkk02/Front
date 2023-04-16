const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
module.exports = (sequelize, DataTyples) => {
  const user = sequelize.define(
    "usuarios",
    {
      idusuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      rol: {
        type: DataTypes.STRING,
        defaultValue: "USER",
      },
      imagenperfil: {
        type: DataTypes.STRING(1000),
        allowNull: true,
      },
      strikes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },
      baneado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      fecharegistro: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return user;
};

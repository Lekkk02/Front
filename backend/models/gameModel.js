module.exports = (sequelize, DataTypes) => {
  const db = require("./index");
  const game = sequelize.define(
    "juegos",
    {
      idJuego: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      titulo: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      flanzamiento: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      urlImagen: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING(800),
        allowNull: false,
      },
      puntuacion: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      genero: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      edadrating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return game;
};

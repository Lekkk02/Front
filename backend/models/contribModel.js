const { DATE } = require("sequelize");
const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
module.exports = (sequelize, DataTyples) => {
  const contrib = sequelize.define(
    "contribucion",
    {
      idcontr: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      calif: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      fechacontr: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      comentario: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return contrib;
};

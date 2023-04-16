const dbConfig = require("../config/dbConfig.js");

const { Sequelize, DataTypes, HasMany } = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.DATABASE,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.idle,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected...");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.games = require("./gameModel.js")(sequelize, DataTypes);
db.contribucion = require("./contribModel.js")(sequelize, DataTypes);
db.genero = require("./generoModel.js")(sequelize, DataTypes);
db.users = require("./userModel.js")(sequelize, DataTypes);
db.admins = require("./adminModel.js")(sequelize, DataTypes);
db.gameMedia = require("./gameMediaModel.js")(sequelize, DataTypes);

///////////////////Creacion de las Foreign Key y asociaciones de las tablas

///Foreign Key en tabla Contribuciones(IdJuego)
db.games.hasMany(db.contribucion, {
  foreignKey: "idJuego",
});
//// FK Genero-Juego

//////FK Contribucion-Usuario

db.users.hasMany(db.contribucion, {
  foreignKey: "idusuario",
});

db.games.hasMany(db.gameMedia, {
  foreignKey: "idJuego",
});

///////////
db.sequelize.sync({ force: false }).then(() => {
  console.log("Database re-sync");
});

/* async function dbConnected() {
  try {
    await dbConnection.authenticate();
    console.log("Database online");
  } catch (error) {
    throw new Error(error);
  }
} */

module.exports = db;

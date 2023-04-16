module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "qwerty09",
  DATABASE: "database_development",
  dialect: "mariadb",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

/*codigo original de maikel

  module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "qwerty09",
  DATABASE: "database_development",
  dialect: "mariadb",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}; */

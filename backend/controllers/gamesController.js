const db = require("../models");

const Game = db.games;

const addGame = async (req, res) => {
  let info = {
    titulo: req.body.titulo,
    flanzamiento: req.body.flanzamiento,
    urlImagen: req.body.urlImagen,
    descripcion: req.body.descripcion,
    puntuacion: req.body.puntuacion,
    precio: req.body.precio,
    edadrating: req.body.edadrating,
    genero: req.body.genero,
  };

  const game = await Game.create(info);
  res.status(200).send(game);
};

const getAllGames = async (req, res) => {
  let games = await Game.findAll({});
  res.status(200).send(games);
};

const getOneGame = async (req, res) => {
  let id = req.params.id;
  let games = await Game.findOne({ where: { idJuego: id } });
  res.status(200).send(games);
};

const updateGame = async (req, res) => {
  let id = req.params.id;
  const game = await Game.update(req.body, { where: { id: id } });
  res.status(200).send(game);
};

const deleteGame = async (req, res) => {
  let id = req.params.id;
  await Game.destroy({ where: { id: id } });
  res.status(200).send("Juego eliminado!");
};

module.exports = {
  addGame,
  getAllGames,
  getOneGame,
  updateGame,
  deleteGame,
};

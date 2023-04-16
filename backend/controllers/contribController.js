const db = require("../models");

const Contribucion = db.contribucion;

const addContrib = async (req, res) => {
  let info = {
    calif: req.body.calif,
    comentario: req.body.calif,
    idJuego: req.body.idJuego,
    idusuario: req.body.idusuario,
  };

  const contribucion = await Contribucion.create(info);
  res.status(200).send(contribucion);
};
const getAll = async (req, res) => {
  let contribucion = await Contribucion.findAll({});
  res.status(200).send(contribucion);
};
const getGameContrib = async (req, res) => {
  let id = req.params.id;
  let contribucion = await Contribucion.findAll({ where: { idJuego: id } });
  res.status(200).send(contribucion);
};

const getUserContrib = async (req, res) => {
  let id = req.params.id;
  let contribucion = await Contribucion.findAll({ where: { idusuario: id } });
  res.status(200).send(contribucion);
};

const deleteContrib = async (req, res) => {
  let id = req.params.id;
  await Contribucion.destroy({
    where: { idcontr: id },
  });
  res.status(200).send("¡Contribución eliminada!");
};

module.exports = {
  getAll,
  addContrib,
  getGameContrib,
  getUserContrib,
  deleteContrib,
};

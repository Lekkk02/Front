const db = require("../models");

const User = db.users;

const registrarUser = async (req, res) => {
  let data = {
    idusuario: req.body.idusuario,
    username: req.body.username,
    password: req.body.password,
    correo: req.body.correo,
  };

  const user = await User.create(data);
  res.status(200).send(user);
};

const getAllUsers = async (req, res) => {
  let users = await User.findAll({});
  res.status(200).send(users);
};

const getOneUser = async (req, res) => {
  let id = req.params.id;
  let users = await User.findOne({ where: { idusuario: id } });
  res.status(200).send(users);
};

const strikeUser = async (req, res) => {
  let id = req.params.id;
  let user = await User.findOne(
    { attributes: ["strikes"] },
    { where: { idusuario: id } }
  );
  CountStrikes = user["strikes"] + 1;
  await User.update({ strikes: CountStrikes }, { where: { idusuario: id } });
  res.status(200).send("Strike añadido");
};
const banUser = async (req, res) => {
  let id = req.params.id;
  await User.update({ baneado: true }, { where: { idusuario: id } });
  res.status(200).send("¡Usuario baneado!");
};

module.exports = {
  registrarUser,
  getAllUsers,
  getOneUser,
  strikeUser,
  banUser,
};

const db = require("../models");

const Media = db.gameMedia;

const addMedia = async (req, res) => {
  let data = {
    id: req.body.id,
    file_name: req.body.file_name,
    file_url: req.body.file_url,
    idJuego: req.body.idJuego,
  };

  const media = await Media.create(data);
  res.status(200).send(media);
};

const deleteMedia = async (req, res) => {
  let id = req.params.id;
  await Media.destroy({ where: { id: id } });
  res.status(200).send("¡Multimedia eliminada!");
};
module.exports = {
  addMedia,
  deleteMedia,
};

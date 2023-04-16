const gameController = require("../controllers/gamesController.js");
const router = require("express").Router();

router.post("/addGame", gameController.addGame);

router.get("/getAllGames", gameController.getAllGames);

router.get("/:id", gameController.getOneGame);

router.delete("/:id", gameController.deleteGame);

router.put("/:id", gameController.updateGame);

module.exports = router;

const contribController = require("../controllers/contribController.js");
const router = require("express").Router();

router.post("/addContrib", contribController.addContrib);

router.get("/getGameContrib/:id", contribController.getGameContrib);

router.get("/getAll", contribController.getAll);

router.get("/getUserContrib/:id", contribController.getUserContrib);

router.delete("/deleteContrib/:id", contribController.deleteContrib);

module.exports = router;

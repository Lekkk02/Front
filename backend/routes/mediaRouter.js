const mediaController = require("../controllers/mediaController.js");
const router = require("express").Router();

router.post("/addMedia", mediaController.addMedia);

router.delete("/deleteMedia/:id", mediaController.deleteMedia);
module.exports = router;

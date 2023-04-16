const userController = require("../controllers/userController.js");
const router = require("express").Router();

router.post("/addUser", userController.registrarUser);

router.get("/getAllUsers", userController.getAllUsers);

router.get("/:id", userController.getOneUser);

router.get("/strikes/:id", userController.strikeUser);

router.put("/ban/:id", userController.banUser);

module.exports = router;

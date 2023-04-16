const routes = {};

routes.games = require("./gameRouter.js");
routes.users = require("./userRouter.js");
routes.media = require("./mediaRouter");
routes.contribucion = require("./contribRouter");

module.exports = routes;

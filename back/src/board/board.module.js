const { sequelize: { models: { User, Board, comment, liked, hash, hashtag }, }, sequelize } = require("../../models");

const BoardRepository = require("./board.repository");
const BoardService = require("./board.service");
const BoardController = require("./board.controller");
const JWT = require("../../lib/jwt");
const crypto = require("crypto");

const jwt = new JWT({ crypto });

const userRepository = new UserRepository({ User });
const userService = new UserService({ userRepository, jwt });
const userController = new UserController({ userService });

module.exports = { boardController };
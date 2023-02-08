const { Sequelize, sequelize } = require("../../models");

const BoardRepository = require("./board.repository");
const BoardService = require("./board.service");
const BoardController = require("./board.controller");



const boardRepository = new BoardRepository({ sequelize, Sequelize });
const boardService = new BoardService({ boardRepository });
const boardController = new BoardController({ boardService });

module.exports = { boardController };
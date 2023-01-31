const {sequelize:{models:{Board}}} = require("../../models");

const BoardRepository = require("./Board.Repository");
const BoardService = require("./Board.Service");
const BoardController = require("./Board.Controller");

const boardRepository = new BoardRepository({Board});
const boardService = new BoardService({});
const boardController = new BoardController({});

module.exports = {boardController};
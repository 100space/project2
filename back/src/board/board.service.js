class BoardService {
    constructor({Board}){
        this.boardRepository = new BoardRepository({Board});
    }
    async createBoard(boardData){
        return this.boardRepository.create(boardData);
    }
    async getAllBoards(){
        return this.boardRepository.findAll();
    }
    async updateBoard(boardIdx, boardData){
        return this.boardRepository.update(boardIdx, boardData);
    }
    async deleteBoard(boardIdx){
        return this.boardRepository.delete(boardIdx);
    }
}

module.exports = BoardService;
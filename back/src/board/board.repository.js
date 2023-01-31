class BoardRepository {
    constructor({ Board }){
        this.Board = Board;
    }
    async create(boardData){
        try{
            const board = await this.Board.create(boardData);
            return {
                message : 'Board created success',
                data : board
            };
        }catch(e){
            throw new Error(e);
        }
    }
    async findAll(boardIdx){
        try{
            const board = await this.Board.findAll(boardIdx);
            return {
                message : 'Board retrieved success',
                data : board
            };
        }catch(e){
            throw new Error(e);
        }
    }
    async update(boardIdx, boardData){
        try{
            const board = await this.Board.update(boardIdx);
            await board.update(boardData);
            return {
                message : 'Board updated success',
                data : board
            };
        }catch(e){
            throw new Error(e);
        }
    }
    async delete(boardIdx){
        try{
            const board = await this.Board.findByPk(boardIdx);
            await board.destroy();
            return {
                message : 'board deleted success'
            }
        }catch(e){
            throw new Error(e)
        }
    }
}

module.exports = BoardRepository;
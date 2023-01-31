class BoardController {
    constructor({Board}){
        this.boardService = new BoardService({Board});
    }
    async createBoard(req,res,next){
        const {body} = req.body;
        try{
            const result = await this.boardService.createBoard(req.body);
            return res.status(201).json(result);
        }catch(e){
            next(e);
        }
    }
    async getAllBoard(req,res,next){
        try{
            const result = await this.boardService.getAllBoard();
            return res.status(200).json(result);
        }catch(e){
            next(e);
        }
    }
    async updateBoard(req,res,next){
        const {params,body} = req.body;
        const {boardIdx} = params;
        try{
            const result = await this.boardService.updateBoard(boardIdx,body);    
            return res.status(200).json(result);
        }catch(e){
            next(e);
        }
    }
    async deleteBoard(req,res,next){
        const { params } = req;
        const {boardIdx} = params;
        try{
            const result = await this.boardService.deleteBoard(boardIdx);
            return res.status(200).json(result);
        }catch(e){
            next(e)
        }
    }
}

module.exports = BoardController;
class BoardController {
    constructor({ boardService }) {
        this.boardService = boardService
    }
    async postWrite(req, res, next) {
        try {
            const { subject, content, categoryMain, categorySub, hash, contentImg, userId, userPic } = req.body
            const result = await this.boardService.MakeWrite({ subject, content, categoryMain, categorySub, hash, userId })
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }

    async infoLike(req, res, next) {
        try {
            const { userId, boardIdx } = req.body
            console.log(userId, boardIdx)
            const result = await this.boardService.InsertLike({ userId, boardIdx })
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = BoardController

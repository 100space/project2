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
}

module.exports = BoardController

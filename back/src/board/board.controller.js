class BoardController {
    constructor({ boardService }) {
        this.boardService = boardService
    }
    async postWrite(req, res, next) {
        try {
            const { subject, content, categoryMain, categorySub, hash } = req.body
            const result = await this.boardService.makeWrite({ subject, content, categoryMain, categorySub, hash })
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = BoardController

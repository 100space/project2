class BoardController {
    constructor({ boardService }) {
        this.boardService = boardService
    }
    async postWrite(req, res, next) {
        try {
            const {
                data: { subject, content, categoryMain, categorySub, tags, writer },
            } = req.body
            const result = await this.boardService.MakeWrite({ subject, content, categoryMain, categorySub, hash: tags, userId: writer })
            // const response = await this.boardService.FindUserInfo({ userId: writer })
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }

    async infoLike(req, res, next) {
        try {
            const { categoryMain, boardIdx, userInfo } = req.body
            // console.log(categoryMain, userInfo.userId, boardIdx)
            const result = await this.boardService.InsertLike({ userId: userInfo.userId, boardIdx, categoryMain })
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = BoardController

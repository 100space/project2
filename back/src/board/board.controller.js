class BoardController {
    constructor({ boardService }) {
        this.boardService = boardService
    }

    async getRandom(req, res, next) {
        try {
            const response = await this.boardService.RandomValue()
            res.status(201).json(response)
        } catch (e) {
            next(e)
        }
    }

    async getHot(req, res, next) {
        try {
            const response = await this.boardService.HotValue()
            res.status(201).json(response)
        } catch (e) {
            next(e)
        }
    }

    async postWrite(req, res, next) {
        try {
            const {
                data: { subject, content, categoryMain, categorySub, tags, writer },
            } = req.body
            const result = await this.boardService.MakeWrite({ subject, content, categoryMain, categorySub, hash: tags, userId: writer })
            console.log(result, "BoardCon")
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }

    async infoLike(req, res, next) {
        try {
            const { categoryMain, boardIdx, userInfo } = req.body
            console.log(categoryMain, userInfo.userId, boardIdx)
            const result = await this.boardService.InsertLike({ userId: userInfo.userId, boardIdx, categoryMain })
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }

    async findBoard(req, res, next) {
        try {
            const { boardIdx } = req.body
            const result = await this.boardService.FindValue({ boardIdx })
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }

    async deleteBoard(req, res, next) {
        try {
            const { boardIdx } = req.params
            const result = await this.boardService.DeleteValue({ boardIdx })
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }
    async pictureInsert(req, res, next) {
        try {
            const { arr, boardIdx } = req.body

            const result = await this.boardService.PictureCreate({ arr, boardIdx })
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = BoardController

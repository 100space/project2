class BoardController {
    constructor({ boardService }) {
        this.boardService = boardService
    }

    // 글쓰기
    async postWrite(req, res, next) {
        try {
            const {
                data: { subject, content, userId, mainCd, subCd, hash },
            } = req.body
            const result = await this.boardService.MakeWrite({ subject, content, mainCd, subCd, userId, hash })
            console.log(result, "cccccccc")
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }
    // 게시판 글 보기 //view (viewcheck XXXXX)
    async findBoard(req, res, next) {
        try {
            const { boardIdx } = req.params
            const result = await this.boardService.FindValue({ boardIdx })
            console.log(result)
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }

    // 게시판 글 수정하기
    async changeBoard(req, res, next) {
        try {
            const { boardIdx } = req.params
            const { subject, content, userId, mainCd, subCd, hash } = req.body
            const result = await this.boardService.ChangeView({ boardIdx, subject, content, userId, mainCd, subCd, hash })
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }
    // 게시판 삭제하기
    async deleteBoard(req, res, next) {
        try {
            const { boardIdx } = req.params
            const result = await this.boardService.DeleteValue({ boardIdx })
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }
    // 메인카테고리 분류
    async findMainCd(req, res, next) {
        try {
            const { mainCd, pageNumber } = req.params
            const result = await this.boardService.FindMainValue({ mainCd, pageNumber })
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }

    // 서브카테고리 분류
    async findCategorySub(req, res, next) {
        try {
            const { mainCd, subCd, pageNumber } = req.params
            const result = await this.boardService.CategoryValue({ mainCd, subCd, pageNumber })
            console.log(result, "subCD")
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }

    // 인덱스 페이지 랜덤으로 값 뿌려주기
    async getRandom(req, res, next) {
        try {
            const response = await this.boardService.RandomValue()
            res.status(201).json(response)
        } catch (e) {
            next(e)
        }
    }

    // 인기 게시물
    async getHot(req, res, next) {
        try {
            const response = await this.boardService.HotValue()
            res.status(201).json(response)
        } catch (e) {
            next(e)
        }
    }

    // 좋아요 값 추가
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

    // 사진 저장하기
    async pictureInsert(req, res, next) {
        try {
            const { arr, boardIdx } = req.body
            const result = await this.boardService.PictureCreate({ arr, boardIdx })
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }

    // 검색 알고리즘
    async searchValue(req, res, next) {
        try {
            const { search } = req.body
            const result = await this.boardService.FindSearch({ search })
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }

    async postComment(req, res, next) {
        try {
            const { boardIdx } = req.params
            const { cmdContent, userId } = req.body
            const result = await this.boardService.PostComment({ boardIdx, inputValue, userId })
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = BoardController

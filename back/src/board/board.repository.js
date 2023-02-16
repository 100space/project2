class BoardRepository {
    constructor({
        sequelize: {
            models: { User, Board, Comment, Liked, Hash, Hashtag, Picture, Category, Recomment },
        },
        Sequelize,
        sequelize,
    }) {
        this.User = User
        this.Board = Board
        this.comment = Comment
        this.liked = Liked
        this.hash = Hash
        this.hashtag = Hashtag
        this.picture = Picture
        this.category = Category
        this.queryTypes = Sequelize.QueryTypes
        this.sequelize = sequelize
        this.Sequelize = Sequelize
        this.recomment = Recomment
        this.hashMake = async (boardIdx, hashArray) => {
            const hashContent = []
            for (let i = 0; i < hashArray.length; i++) {
                const result = hashArray[i]
                const newHashTag = await this.hashtag.findOrCreate({ where: { tag: result }, raw: true })
                let hashVal = newHashTag[0].hashTagIdx
                const newHash = await this.hash.findOrCreate({
                    where: { boardIdx, hashTagIdx: hashVal },
                    raw: true,
                })
            }
        }
    }
    // 글쓰기
    async createBoard(payload) {
        try {
            const { subject, content, mainCdValue, subCdValue, hashArray, userId } = payload
            // console.log(payload)
            const newBoard = (await this.Board.create({ subject, content, userId, cateCd: `${mainCdValue}${subCdValue}` })).get({ plain: true })
            const newHashTagVal = []
            const userInfo = await this.User.findAll({ where: { userId }, raw: true })
            const userPic = userInfo[0].userPic
            // const newUser = await this.sequelize.query(`UPDATE USER SET userBoard=userBoard+1 WHERE userId='${userId}'`, { type: this.queryTypes.UPDATE })
            // const userPoint = await this.sequelize.query(`UPDATE USER SET userPoint=userPoint+10 WHERE userId='${userId}'`, { type: this.queryTypes.UPDATE })

            if (!hashArray) return { newBoard, newHashTagVal }
            const { boardIdx } = newBoard
            const newHashTag = await this.hashMake(boardIdx, hashArray)
            const hashValue = await this.sequelize.query(`SELECT A.boardIdx, B.tag FROM Hash A JOIN HASHTAG B On (A.hashTagIdx = B.hashTagIdx) where A.boardIdx = ${boardIdx}`, {
                type: this.queryTypes.SELECT,
            })
            newBoard.userPic = userPic
            const addUserPoint = await this.User.increment({ userPoint: 10 }, { where: { userId } })
            return { newBoard, hashValue, addUserPoint }
        } catch (error) {
            throw new Error(`Error while creating board: ${error.message}`)
        }
    }

    // view 페이지
    async findValue(payload) {
        try {
            const { boardIdx } = payload
            const response = await this.Board.findOne({ where: { boardIdx }, raw: true })
            const hashResponse = await this.sequelize.query(`SELECT A.boardIdx, B.tag FROM Hash A JOIN HASHTAG B On (A.hashTagIdx = B.hashTagIdx) where A.boardIdx = ${boardIdx}`, {
                type: this.queryTypes.SELECT,
            })
            const commentResponse = await this.sequelize.query(
                `SELECT B.cmdIdx, B.cmdContent, B.boardIdx, B.userId, B.createdAt from Board A JOIN Comment B On (A.boardIdx = B.boardIdx) where A.boardIdx =${boardIdx} order by B.cmdIdx DESC`,
                {
                    type: this.queryTypes.SELECT,
                }
            )
            const commentLength = commentResponse.length
            const likedTable = await this.liked.findAll({
                where: {
                    boardIdx,
                },
                raw: true,
            })
            const likedUser = likedTable.map((x) => x.userId)
            const recmd = await this.sequelize.query(
                `SELECT A.cmdIdx, A.recmdContent, A.createdAt , A.userId FROM Recomment A JOIN (SELECT A.cmdIdx FROM Comment A JOIN Board B ON A.boardIdx = B.boardIdx WHERE A.boardIdx = ${boardIdx}) B ON A.cmdIdx = B.cmdIdx ORDER BY A.createdAt DESC `,
                {
                    type: this.queryTypes.SELECT,
                }
            )
            return { response, hashResponse, commentResponse, commentLength, likedUser, recmd }
        } catch (e) {
            throw new Error(`Error while find status: ${e.message}`)
        }
    }

    // 게시글 수정하기
    async changeView(payload) {
        try {
            const { subject, content, mainCdValue, subCdValue, hashArray, userId, boardIdx } = payload
            const response = await this.Board.update(
                { subject, content, cateCd: `${mainCdValue}${subCdValue}`, userId },
                {
                    where: {
                        boardIdx,
                    },
                }
            )
            if (!hashArray) return { newBoard, newHashTagVal }
            const newHashTag = await this.hashMake(boardIdx, hashArray)
            return newHashTag
        } catch (e) {
            throw new Error(`Error while change status: ${e.message}`)
        }
    }

    // 게시글 지우기
    async deleteValue(payload) {
        try {
            console.log(payload)
            const { boardIdx } = payload
            const boardResponse = await this.Board.destroy({ where: { boardIdx }, raw: true })
            return boardResponse
        } catch (e) {
            throw new Error(`Error while delete status: ${e.message}`)
        }
    }
    // 랜덤값 추출
    async randomValue() {
        try {
            const boardRandom = await this.sequelize.query(
                "SELECT A.userId, A.subject, A.viewCount, A.liked, A.content ,A.boardIdx, A.cateCd , B.picture From Board A LEFT JOIN Picture B ON A.boardIdx = B.boardIdx where A.boardLevel = 0 order by rand() Limit 7",
                { type: this.queryTypes.SELECT }
            )
            const randomUser = []
            const randomHash = []
            for (let i = 0; i < boardRandom.length; i++) {
                const randomUserid = boardRandom[i].userId
                const randomboardIdx = boardRandom[i].boardIdx
                const randomUserinfo = await this.User.findOne({ where: { userId: randomUserid }, raw: true })
                randomUser.push(randomUserinfo)
                const randomhashtagValue = await this.sequelize.query(`SELECT A.tag FROM Hashtag A JOIN Hash B ON A.hashTagIdx = B.hashTagIdx WHERE B.boardIdx =${randomboardIdx}`, {
                    type: this.queryTypes.SELECT,
                })
                randomHash.push(randomhashtagValue)
            }

            return { boardRandom, randomUser, randomHash }
        } catch (e) {
            throw new Error(`error while finding randomValue: ${e.message}`)
        }
    }

    // 카테고리별 게시판
    async findMainValue({ mainCdValue, pageNumber }) {
        const Op = this.Sequelize.Op
        try {
            const indexValue = pageNumber * 5 - 4 === 1 ? 0 : pageNumber * 5 - 5
            // console.log(pageNumber);
            console.log(indexValue)
            const allMainCd = await this.Board.count({
                where: {
                    cateCd: {
                        [Op.like]: `${mainCdValue}%`,
                    },
                },
            })
            const findMain = await this.Board.findAll({
                limit: 5,
                offset: indexValue,
                where: {
                    cateCd: {
                        [Op.like]: `${mainCdValue}%`,
                    },
                },
                raw: true,
            })
            // console.log()
            // const mainLength = allMainCd.length
            // console.log(mainLength)
            const findSub = await this.sequelize.query(`SELECT DISTINCT cateCd FROM BOARD WHERE cateCd LIKE '${mainCdValue}%'`, { type: this.queryTypes.SELECT })
            return { findMain, allMainCd, findSub }
        } catch (e) {
            throw new Error(`Error while find pagingValue: ${e.message}`)
        }
    }

    // subcategory 정렬
    async categoryValue({ findValue, pageNumber, mainCdValue }) {
        const Op = this.Sequelize.Op
        try {
            const indexValue = pageNumber * 5 - 4 === 1 ? 0 : pageNumber * 5 - 4
            const subcateLength = await this.Board.count({
                where: {
                    cateCd: {
                        [Op.like]: `%${findValue}%`,
                    },
                },
            })
            const correctValue = await this.Board.findAll({
                limit: 5,
                offset: indexValue,
                where: {
                    cateCd: {
                        [Op.like]: `%${findValue}%`,
                    },
                },
                raw: true,
            })
            const findSub = await this.sequelize.query(`SELECT DISTINCT cateCd FROM BOARD WHERE cateCd LIKE '${mainCdValue}%'`, { type: this.queryTypes.SELECT })
            return { correctValue, subcateLength, findSub }
        } catch (e) {
            throw new Error(`Error while find category: ${e.message}`)
        }
    }

    // 인기게시물
    async hotValue() {
        try {
            const boardHot = await this.Board.findAll({ order: this.sequelize.literal("liked DESC"), limit: 3, raw: true })
            return boardHot
        } catch (e) {
            throw new Error(`error while finding hotValue: ${e.message}`)
        }
    }

    // user 정보 찾기
    async findUserInfo(payload) {
        const { userId } = payload
        const userInfo = await this.User.findOne({ userId, raw: true })
        return userInfo
    }

    // 좋아요 추가&삭제
    async insertLike(payload) {
        try {
            // userId, boarIdx, mainCD payload 담기
            const { userId, boardIdx, mainCd } = payload
            console.log("11 repository", payload)
            // user, boardIdx 일치하는 게시물의 좋아요 확인
            const liked = await this.liked.findOne({
                where: { userId, boardIdx },
            })
            console.log("22 repository", liked)
            // 좋아요가 이미 있으면 좋아요 제거
            if (liked) {
                await liked.destroy()
            } // 좋아요가 없으면 좋아요 추가
            else {
                await this.liked.create({
                    userId,
                    boardIdx,
                })
            }
            // boardIdx 매칭되는 게시물 좋아요 개수 카운트
            const likeCount = await this.liked.count({
                where: {
                    boardIdx,
                },
            })
            // 게시물 좋아요 수 업데이트
            const response = await this.Board.update({ liked: likeCount }, { where: { boardIdx } })
            const likedTable = await this.liked.findAll({
                where: {
                    boardIdx,
                },
                raw: true,
            })
            return likedTable
        } catch (e) {
            throw new Error(`Error while inserting like: ${e.message}`)
        }
    }

    // 사진 값 정렬
    async pictureCreate(payload) {
        try {
            const { boardIdx, boardFile } = payload
            for (let i = 0; i < boardFile.length; i++) {
                const response = await this.picture.findOrCreate({ where: { boardIdx, picture: boardFile[i] } })
            }
        } catch (e) {
            throw new Error(`Error while delete status: ${e.message}`)
        }
    }

    // 리팩토링 시작
    async categorySubValue({ categoryMain, categorySub }) {
        try {
            const response = await this.Board.findAll({
                attributes: [
                    "boardIdx",
                    "subject",
                    "content",
                    "viewCount",
                    "categoryMain",
                    "categorySub",
                    "liked",
                    [this.sequelize.fn("DATE_FORMAT", this.sequelize.col("createdAt"), "%Y-%m-%d"), "createdAt"],
                ],
                where: { categoryMain, categorySub },
                raw: true,
                limit: 5,
            })

            const subCount = await this.Board.count({
                where: { categoryMain, categorySub },
            })
            return { response, subCount }
        } catch (e) {
            throw new Error(`Error while find subCategory: ${e.message}`)
        }
    }
    // 리팩토링 끝

    // 검색하기
    async findSearch({ search }) {
        try {
            const Op = this.Sequelize.Op
            const response = await this.Board.findAll({
                where: {
                    subject: { [Op.like]: `%${search}%` },
                },
                raw: true,
            })
            const boardCount = await this.Board.count({
                where: {
                    subject: { [Op.like]: `%${search}%` },
                },
                raw: true,
            })
            return { response, boardCount }
        } catch (e) {
            throw new Error(`Error while find search Value: ${e.message}`)
        }
    }

    //list 검색하기

    async listValue({ search, mainCdValue }) {
        try {
            const Op = this.Sequelize.Op
            const subjectResponse = await this.Board.findAll({
                where: {
                    subject: { [Op.like]: `%${search}%` },
                    cateCd: { [Op.like]: `${mainCdValue}%` },
                },
                raw: true,
            })
            const adminResponse = await this.Board.findAll({
                where: {
                    userId: { [Op.like]: `%${search}%` },
                    cateCd: { [Op.like]: `${mainCdValue}%` },
                },
                raw: true,
            })
            return { subjectResponse, adminResponse }
        } catch (e) {
            throw new Error(`Error while find list Value: ${e.message}`)
        }
    }
    // 댓글 작성

    async postComment({ boardIdx, cmdContent, userId }) {
        try {
            const response = (await this.comment.create({ boardIdx, cmdContent, userId })).get({ plain: true })
            const count = await this.comment.count()
            const addUserPoint = await this.User.increment({ userPoint: 5 }, { where: { userId } })
            const result = { response, count, addUserPoint }
            return result
        } catch (e) {
            throw new Error(`Error while create Comment Value: ${e.message}`)
        }
    }

    // 댓글 수정하기

    async updateComment({ cmdContent, cmdIdx }) {
        try {
            const response = await this.comment.update({ cmdContent }, { where: { cmdIdx } })
            return response
        } catch (e) {
            throw new Error(`Error while update Comment Value: ${e.message}`)
        }
    }

    // 댓글 삭제하기
    async dropComment({ cmdIdx }) {
        try {
            const response = await this.comment.destroy({
                where: {
                    cmdIdx,
                },
            })
            console.log(response)
            return response
        } catch (e) {
            throw new Error(`Error while delete Comment status: ${e.message}`)
        }
    }

    // 대댓글 달기
    async creReComment({ cmdIdx, recmdContent, userId }) {
        try {
            console.log(cmdIdx)
            const response = (await this.recomment.create({ cmdIdx, recmdContent, userId })).get({ plain: true })

            const result = await this.recomment.findAll({ where: { cmdIdx }, raw: true })
            console.log(result, "$%$%$%$%")
            return result
        } catch (e) {
            throw new Error(`Error while create ReComment status: ${e.message}`)
        }
    }
}

module.exports = BoardRepository

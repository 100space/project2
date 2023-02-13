class BoardRepository {
    constructor({
        sequelize: {
            models: { User, Board, Comment, Liked, Hash, Hashtag, Picture, Category },
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
            const newBoard = (await this.Board.create({ subject, content, userId, cateCd: `${mainCdValue}${subCdValue}` })).get({ plain: true })
            const newHashTagVal = []
            const userInfo = await this.User.findAll({ where: { userId }, raw: true })
            const userPic = userInfo[0].userPic
            const newUser = await this.sequelize.query(`UPDATE USER SET userBoard=userBoard+1 WHERE userId='${userId}'`, { type: this.queryTypes.UPDATE })
            const userPoint = await this.sequelize.query(`UPDATE USER SET userPoint=userPoint+10 WHERE userId='${userId}'`, { type: this.queryTypes.UPDATE })

            if (!hashArray) return { newBoard, newHashTagVal }
            const { boardIdx } = newBoard
            const newHashTag = await this.hashMake(boardIdx, hashArray)
            const hashValue = await this.sequelize.query(`SELECT A.boardIdx, B.tag FROM Hash A JOIN HASHTAG B On (A.hashTagIdx = B.hashTagIdx) where A.boardIdx = ${boardIdx}`, {
                type: this.queryTypes.SELECT,
            })
            newBoard.userPic = userPic
            return { newBoard, hashValue }
        } catch (error) {
            throw new Error(`Error while creating board: ${error.message}`)
        }
    }

    // view 페이지
    async findValue(payload) {
        try {
            const { boardIdx } = payload
            const response = await this.Board.findOne({ where: { boardIdx }, raw: true })

            return response
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
            const changeHash = []
            if (hashArray) {
                const hashResponse = await this.hash.findAll({ where: { boardIdx }, raw: true })
                for (let i = 0; i < hashResponse.length; i++) {
                    let hashTagIdx = hashResponse[i].hashTagIdx
                    const deleteHashTag = await this.hashtag.destroy({
                        where: {
                            hashTagIdx,
                        },
                    })
                    const deleteHash = await this.hashtag.destroy({
                        where: {
                            hashTagIdx,
                        },
                    })
                }
                for (let j = 0; j < hashArray.length; j++) {
                    const result = hashArray[j]
                    const newHashTag = (await this.hashtag.create({ tag: result })).get({ plain: true })
                    changeHash.push(newHashTag)
                }
                return { response, changeHash }
            } else {
                return response
            }
        } catch (e) {}
    }

    // 게시글 지우기
    async deleteValue(payload) {
        try {
            const { boardIdx } = payload
            const boardResponse = await this.Board.findOne({ where: { boardIdx }, raw: true })
            const boardLevel = boardResponse.boardLevel + 1
            const response = await this.Board.update(
                { boardLevel: boardLevel },
                {
                    where: {
                        boardIdx,
                    },
                }
            )
        } catch (e) {
            throw new Error(`Error while delete status: ${e.message}`)
        }
    }
    // 랜덤값 추출
    async randomValue() {
        try {
            // const boardRandom = await this.sequelize.query("SELECT A.userId, A.subject, A.viewCount, A.liked, A.boardIdx, B.picture From Board A LEFT JOIN Picture B ON A.boardIdx = B.boardIdx order by rand() Limit 7", { type: this.queryTypes.SELECT })
            const boardRandom = await this.sequelize.query(
                "SELECT A.userId, A.subject, A.viewCount, A.liked, A.content ,A.boardIdx, A.cateCd , B.picture From Board A LEFT JOIN Picture B ON A.boardIdx = B.boardIdx where A.boardLevel = 0 order by rand() Limit 7",
                { type: this.queryTypes.SELECT }
            )
            // console.log(boardRandom)
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
            const indexValue = pageNumber * 5 - 4 === 1 ? 0 : pageNumber * 5 - 4
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
            const findSub = await this.sequelize.query(`SELECT DISTINCT cateCd FROM BOARD WHERE cateCd LIKE '${mainCdValue}%'`, { type: this.queryTypes.SELECT })
            return { findMain, allMainCd, findSub }
        } catch (e) {
            throw new Error(`Error while find pagingValue: ${e.message}`)
        }
    }

    // subcategory 정렬
    async categoryValue({ findValue, pageNumber }) {
        const Op = this.Sequelize.Op
        try {
            const indexValue = pageNumber * 5 - 4 === 1 ? 0 : pageNumber * 5 - 4
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
            return correctValue
        } catch (e) {
            throw new Error(`Error while find category: ${e.message}`)
        }
    }

    // 인기게시물
    async hotValue() {
        try {
            const boardHot = await this.Board.findAll({ order: this.sequelize.literal("liked DESC"), limit: 3, raw: true })
            console.log(boardHot)
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

    // 좋아요 추가
    async insertLike(payload) {
        try {
            const { userId, boardIdx, categoryMain } = payload
            const likeResult = await this.liked.findOrCreate({
                where: { userId, boardIdx },
                defaults: {
                    userId,
                    boardIdx,
                },
            })
            const likeresult = likeResult[0].dataValues
            if (likeResult[1]) {
                const likeCount = await this.liked.findAll({
                    where: {
                        boardIdx,
                    },
                    raw: true,
                })
                const likeValue = likeCount.length
                const boardLike = await this.Board.update({ liked: likeValue }, { where: { boardIdx } })
                return boardLike
            } else {
                const likeDelete = await this.liked.destroy({
                    where: {
                        userId,
                    },
                })
                const likeCount = await this.liked.findAll({
                    where: {
                        boardIdx,
                    },
                    raw: true,
                })
                const likeValue = likeCount.length
                const boardLike = await this.Board.update({ liked: likeValue }, { where: { boardIdx } })
                return boardLike
            }
        } catch (e) {
            throw new Error(`Error while insert status: ${e.message}`)
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
            console.log(response)
            const boardCount = await this.Board.count({
                where: {
                    subject: { [Op.like]: `%${search}%` },
                },
                raw: true,
            })
            console.log(boardCount)
            return { response, boardCount }
        } catch (e) {
            throw new Error(`Error while find search Value: ${e.message}`)
        }
    }
}

module.exports = BoardRepository

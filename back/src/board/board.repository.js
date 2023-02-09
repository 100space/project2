class BoardRepository {
    constructor({ sequelize, Sequelize }) {
        this.User = sequelize.models.User
        this.Board = sequelize.models.Board
        this.comment = sequelize.models.Comment
        this.liked = sequelize.models.Liked
        this.hash = sequelize.models.Hash
        this.hashtag = sequelize.models.Hashtag
        this.picture = sequelize.models.Picture
        this.category = sequelize.models.Category
        this.queryTypes = sequelize.QueryTypes
        this.sequelize = sequelize
        this.Sequelize = Sequelize
    }

    async randomValue() {
        try {
            // const boardRandom = await this.sequelize.query("SELECT A.userId, A.subject, A.viewCount, A.liked, A.boardIdx, B.picture From Board A LEFT JOIN Picture B ON A.boardIdx = B.boardIdx order by rand() Limit 7", { type: this.queryTypes.SELECT })
            const boardRandom = await this.sequelize.query("SELECT A.userId, A.subject, A.viewCount, A.liked,A.content ,A.boardIdx, B.picture From Board A LEFT JOIN Picture B ON A.boardIdx = B.boardIdx where B.picture LIKE '__\_0%'  order by rand() Limit 7", { type: this.queryTypes.SELECT })
            const randomUser = []
            const randomHash = []
            for (let i = 0; i < boardRandom.length; i++) {
                const randomUserid = boardRandom[i].userId
                const randomboaridx = boardRandom[i].boardIdx
                const randomUserinfo = await this.User.findOne({ where: { userId: randomUserid }, raw: true })
                randomUser.push(randomUserinfo)
                const randomhashtagValue = await this.sequelize.query(`SELECT B.boardIdx, A.tag FROM Hashtag A LEFT JOIN Hash B ON A.hashTagIdx = B.hashTagIdx`)
            }
            return { boardRandom, randomUser }

        } catch (e) {
            throw new Error(`error while finding randomValue: ${e.message}`)
        }
    }

    async hotValue() {
        try {
            const boardHot = await this.Board.findAll({ order: this.sequelize.literal("liked DESC"), limit: 3, raw: true })
        } catch (e) {
            throw new Error(`error while finding hotValue: ${e.message}`)
        }
    }

    async findUserInfo(payload) {
        const { userId } = payload
        const userInfo = await this.User.findOne({ userId, raw: true })
        return userInfo
    }

    async createBoard(payload) {
        try {
            const { subject, content, categoryMain, categorySub, hash, userId } = payload
            const newBoard = (await this.Board.create({ subject, content, categoryMain, categorySub, userId })).get({ plain: true })
            const newHashTagVal = []

            if (hash) {
                const boardContent = await this.sequelize.query("SELECT * FROM Board ORDER BY boardIdx DESC limit 1", { type: this.queryTypes.SELECT })
                const [lastBoard] = boardContent
                const { boardIdx } = lastBoard
                for (let i = 0; i < hash.length; i++) {
                    const result = hash[i]
                    const newHashTag = (await this.hashtag.create({ tag: result })).get({ plain: true })
                    newHashTagVal.push(newHashTag)
                }
                const hashVal = newHashTagVal.map(x => x.hashTagIdx)
                console.log(hashVal)
                for (let j = 0; j < hashVal.length; j++) {
                    const newHash = await this.hash.findOrCreate({
                        where: { boardIdx, hashTagIdx: hashVal[j] }
                    })
                }
                return { newBoard, newHashTagVal }
            }
            return newBoard
        } catch (error) {
            throw new Error(`Error while creating board: ${error.message}`)
        }
    }

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

    async findValue(payload) {
        try {
            const { boardIdx } = payload
            const response = await this.Board.findOne({ where: { boardIdx }, raw: true })
            return response
        } catch (e) {
            throw new Error(`Error while find status: ${e.message}`)
        }
    }

    async deleteValue(payload) {
        try {
            const { boardIdx } = payload
            const response = await this.Board.findOne({ where: { boardIdx }, raw: true })
            if (response) {
                const result = await this.Board.destroy({ where: { boardIdx } })
            }
        } catch (e) {
            throw new Error(`Error while delete status: ${e.message}`)
        }
    }
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
}

module.exports = BoardRepository

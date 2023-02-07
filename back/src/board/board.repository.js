class BoardRepository {
    constructor({ sequelize }) {
        this.User = sequelize.models.User
        this.Board = sequelize.models.Board
        this.comment = sequelize.models.comment
        this.liked = sequelize.models.Liked
        this.hash = sequelize.models.Hash
        this.hashtag = sequelize.models.Hashtag
        this.category = sequelize.models.category
        this.queryTypes = sequelize.QueryTypes
        this.sequelize = sequelize
    }
    async findUserInfo(payload) {
        const { userId } = payload
        const userInfo = await this.User.findOne({ userId, raw: true })
        return userInfo
    }
    // 등록할떄 토큰값 필요함
    async createBoard(payload) {
        try {
            const { subject, content, categoryMain, categorySub, hash, userId } = payload
            const hashValue = hash.reduce((acc, value, index) => {
                acc[`hash${index + 1}`] = value
                return acc
            }, {})
            const newBoard = await this.Board.create({ subject, content, categoryMain, categorySub, userId }, { plain: true })

            if (hashValue) {
                const boardContent = await this.Board.findOne({ subject, raw: true })
                const { boardIdx } = boardContent
                for (let i = 0; i < Object.keys(hashValue).length; i++) {
                    const result = hash[i]
                    const newHashTag = await this.hashtag.create({ hashtagIdx: boardIdx, tag: result })
                }
                for (let j = 1; j <= hash.length; j++) {
                    const newHash = await this.hash.findOrCreate({
                        where: { boardIdx, hashTagIdx: j },
                        defaults: {
                            boardIdx,
                            hashTagIdx: j,
                        },
                    })
                }
            }
            const hashtagValue = await this.sequelize.query("SELECT boardIdx, tag FROM Hashtag A LEFT JOIN Hash B ON A.hashTagIdx = B.hashTagIdx", { type: this.queryTypes.SELECT })
            return { newBoard, hashtagValue }
        } catch (error) {
            throw new Error(`Error while creating board: ${error.message}`)
        }
    }

    async insertLike(payload) {
        try {
            const { userId, boardIdx } = payload
            const likeResult = await this.liked.findOrCreate({
                where: { userId, boardIdx },
                defaults: {
                    userId,
                    boardIdx,
                },
            })
            const likeresult = likeResult[0].dataValues
            if (likeresult) {
                const likeCount = await this.liked.findAll({
                    where: {
                        boardIdx,
                    },
                    raw: true,
                })
                console.log(likeCount.length)
                // const boardLike = await this.Board.update({ liked: liked++ }, { where: { boardIdx } })
                // console.log(boardLike)
            }
        } catch (e) {
            throw new Error(`Error while insert status: ${e.message}`)
        }
    }
}

module.exports = BoardRepository

class BoardRepository {
    constructor({ sequelize: { models: { User, Board, Comment, Liked, Hash, Hashtag, Picture, Category } }, Sequelize, sequelize }) {
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
    }

    async randomValue() {
        try {
            // const boardRandom = await this.sequelize.query("SELECT A.userId, A.subject, A.viewCount, A.liked, A.boardIdx, B.picture From Board A LEFT JOIN Picture B ON A.boardIdx = B.boardIdx order by rand() Limit 7", { type: this.queryTypes.SELECT })
            const boardRandom = await this.sequelize.query("SELECT A.userId, A.subject, A.viewCount, A.liked, A.content ,A.boardIdx, B.picture From Board A LEFT JOIN Picture B ON A.boardIdx = B.boardIdx where B.picture LIKE '__\_0%'  order by rand() Limit 7", { type: this.queryTypes.SELECT })
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
            const { subject, content, mainCdValue, subCdValue, hashArray, userId } = payload
            const newBoard = (await this.Board.create({ subject, content, userId, cateCd: `${mainCdValue}${subCdValue}` })).get({ plain: true })
            const newHashTagVal = []
            const newUser = await this.sequelize.query(`UPDATE USER SET userBoard=userBoard+1 WHERE userId='${userId}'`, { type: this.queryTypes.UPDATE })
            const userPoint = await this.sequelize.query(`UPDATE USER SET userPoint=userPoint+10 WHERE userId='${userId}'`, { type: this.queryTypes.UPDATE })
            if (hashArray) {
                const { boardIdx } = newBoard
                for (let i = 0; i < hashArray.length; i++) {
                    const result = hashArray[i]
                    const newHashTag = (await this.hashtag.create({ tag: result })).get({ plain: true })
                    newHashTagVal.push(newHashTag)
                }
                const hashVal = newHashTagVal.map(x => x.hashTagIdx)
                for (let j = 0; j < hashVal.length; j++) {
                    const newHash = await this.hash.findOrCreate({
                        where: { boardIdx, hashTagIdx: hashVal[j] }
                    })
                }
                return { newBoard, newHashTagVal }
                console.log(newBoard, newHashTagVal)
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

    async findCategory(mainCd, subCd) {
        try {
            // select * from Category where name='notice' and subCd='0000'; mainName
            // select * from Category where name='sub1' and not subCd in('0000'); subName

            /*
                select count(*) as length from (
                    select * from Category where name='notice' and subCd='0000' 
                    union all 
                    select * from Category where name='sub1' and not subCd in('0000')
                ) as A;
            */

            // subcd undefiend 
            const where = {
                name: mainCd,
            }

            const response = await this.sequeluze.query(`
                select count(*) as length from (
                    select * from Category where name='${mainCd}' and subCd='0000' 
                    ${!subCd && `union all 
                    select * from Category where name='${subCd}' and not subCd in('0000')`}
                ) as A;
            `)

            return response
            // const response = await this.category.findAll({ where, raw: true })
            // return response
        } catch (e) {
            throw new Error('err')
        }
    }

    async categoryValue({ categoryMain, categorySub }) {
        try {
            const response = await this.Board.findAll({ where: { categoryMain, categorySub }, raw: true, limit: 5 })
            const subVal = await this.sequelize.query(`SELECT DISTINCT categorySub FROM Board where categoryMain ='${categoryMain}'`, { type: this.queryTypes.SELECT })
            return { response, subVal }
        } catch (e) {
            throw new Error(`Error while find category: ${e.message}`)
        }
    }


    // 리팩토링 시작 
    async categorySubValue({ categoryMain, categorySub }) {
        try {
            const response = await this.Board.findAll({
                attributes: ["boardIdx", "subject", "content", "viewCount", "categoryMain", "categorySub", "liked",
                    [this.sequelize.fn("DATE_FORMAT", this.sequelize.col("createdAt"), "%Y-%m-%d"), 'createdAt'
                    ]
                ],
                where: { categoryMain, categorySub }, raw: true, limit: 5
            })

            const subCount = await this.Board.count({
                where: { categoryMain, categorySub }
            })
            return { response, subCount }
        } catch (e) {
            throw new Error(`Error while find subCategory: ${e.message}`)
        }
    }
    // 리팩토링 끝

    async pagingValue({ categoryMain, categorySub, pagingIndex }) {
        try {
            const countpaging = (5 * pagingIndex) - 5
            console.log(categoryMain, categorySub, pagingIndex)
            const response = await this.sequelize.query(`SELECT row_number() over(order by boardIdx asc) AS num, subject, content, viewCount, categoryMain, categorySub, userId, createdAt, liked FROM Board WHERE categoryMain='${categoryMain}' AND categorySub='${categorySub}' limit 5 OFFSET ${countpaging}`, { type: this.queryTypes.SELECT })
            const subCount = await this.Board.count({
                where: { categoryMain, categorySub }
            })
            return { response, subCount }
        } catch (e) {
            throw new Error(`Error while find pagingValue: ${e.message}`)
        }
    }

    async findSearch({ search }) {
        try {
            const Op = this.Sequelize.Op
            const response = await this.Board.findAll({
                where: {
                    subject: { [Op.like]: `%${search}%` }
                }, raw: true
            })
            console.log(response)
            const boardCount = await this.Board.count({
                where: {
                    subject: { [Op.like]: `%${search}%` }
                }, raw: true
            })
            console.log(boardCount)
            return { response, boardCount }
        } catch (e) {
            throw new Error(`Error while find search Value: ${e.message}`)
        }
    }
}

module.exports = BoardRepository

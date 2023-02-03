class BoardRepository {
    constructor({ sequelize }) {
        this.User = sequelize.models.User;
        this.Board = sequelize.models.Board;
        this.comment = sequelize.models.comment;
        this.liked = sequelize.models.liked;
        this.hash = sequelize.models.Hash;
        this.hashtag = sequelize.models.Hashtag;
        this.category = sequelize.models.category
        // this.sequelize = sequelize
        // this.QueryTypes = QueryTypes
    }
    // 등록할떄 토큰값 필요함 
    async createBoard(payload) {
        try {
            console.log(this.hashtag)
            const { subject, content, categoryMain, categorySub, hash, userId } = payload

            const hashValue = hash.reduce((acc, value, index) => {
                acc[`hash${index + 1}`] = value
                return acc
            }, {})


            // const result = await this.Board.create(subject, content, categoryMain, categorySub)
            const newBoard = await this.Board.create({ subject, content, categoryMain, categorySub, userId })

            // const newCategory = await this.category.create({ categoryMain, categorySub })
            // console.log(newCategory)
            if (hashValue) {
                const boardContent = await this.Board.findOne({ subject, raw: true })


                const { boardIdx } = boardContent
                // const newHash = await this.hash.findOrCreate({
                //     where: { boardIdx },
                //     defaults: {
                //         boardIdx,
                //         hashtagIdx: boardIdx
                //     }
                // })
                console.log(hash)
                for (let i = 0; i < Object.keys(hashValue).length; i++) {
                    const result = hash[i]
                    const newHashTag = await this.hashtag.create({ hashtagIdx: boardIdx, tag: result })
                }
                for (let j = 1; j <= hash.length; j++) {
                    const newHash = await this.hash.findOrCreate({
                        where: { boardIdx, hashTagIdx: j },
                        defaults: {
                            boardIdx,
                            hashTagIdx: j
                        }
                    })
                }
            }

        } catch (error) {
            throw new Error(`Error while creating board: ${error.message}`);
        }
    }
}


module.exports = BoardRepository;
class BoardRepository {
    constructor({ User, Board, comment, liked, hash, hashtag, sequelize }) {
        this.User = User;
        this.Board = Board;
        this.comment = comment;
        this.liked = liked;
        this.hash = hash;
        this.hashtag = hashtag;
        this.sequelize = sequelize
    }

    async createBoard(payload) {
        try {
            const { QueryTypes } = this.sequelize
            const { subject, content, categoryMain, categorySub, hash1, hash2, hash3, hash4, hash5 } = payload
            // const result = await this.Board.create(subject, content, categoryMain, categorySub)
            const newBoard = await this.Board.create(payload);
            // const hashPromises = hashtagText.map(tag => this.hash.findOrCreate({ where: { hashtagText: tag } }));
            const result
            const hashResults = await Promise.all(hashPromises);
            await newBoard.addHashtags(hashResults.map(result => result[0].id));
            return newBoard;
        } catch (error) {
            throw new Error(`Error while creating board: ${error.message}`);
        }
    }
}


module.exports = BoardRepository;
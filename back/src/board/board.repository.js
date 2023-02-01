class BoardRepository {
    constructor({User, Board, comment, liked, hash, hashtag}) {
        this.User = User;
        this.Board = Board;
        this.comment = comment;
        this.liked = liked;
        this.hash = hash;
        this.hashtag = hashtag;
    }

    async createBoard(boardData) {
        try {
            const {subject, content, hashtagText , userId} = boardData;
            const newBoard = await this.Board.create({subject, content, userId});
            const hashPromises = hashtagText.map(tag => this.hash.findOrCreate({where: {hashtagText: tag}}));
            const hashResults = await Promise.all(hashPromises);
            await newBoard.addHashtags(hashResults.map(result => result[0].id));
            return newBoard;
        } catch (error) {
            throw new Error(`Error while creating board: ${error.message}`);
        }
    }
}


module.exports = BoardRepository;
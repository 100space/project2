class BoardService {
    constructor({ boardRepository }) {
        this.boardRepository = boardRepository;
    }

    async MakeWrite({ subject, content, categoryMain, categorySub, hash, userId }) {
        try {

            const array = hash.split(",")

            const result = await this.boardRepository.createBoard({ subject, content, categoryMain, categorySub, hash: array, userId })
            return result
        } catch (e) {
            throw new Error(e)
        }
    }

}

module.exports = BoardService;

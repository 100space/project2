class BoardService {
    constructor({ boardRepository }) {
        this.boardRepository = boardRepository;
    }

    async PostWrite({ subject, content, categoryMain, categorySub, hash }) {
        try {
            const [hash1, hash2, hash3, hash4, hash5] = hash
            const result = await this.boardRepository.createBoard({ subject, content, categoryMain, categorySub, hash1, hash2, hash3, hash4, hash5 })
            return result
        } catch (e) {
            throw new Error(e)
        }
    }

}

module.exports = BoardService;

class BoardService {
    constructor({ boardRepository }) {
        this.boardRepository = boardRepository
    }
    async FindUserInfo({ userId }) {
        try {
            const response = await this.boardRepository.findUserInfo({ userId })
            return response
        } catch (error) { }
    }
    async MakeWrite({ subject, content, categoryMain, categorySub, hash, userId }) {
        try {
            const result = await this.boardRepository.createBoard({ subject, content, categoryMain, categorySub, hash, userId })
            console.log(result, "servic")
            return result
        } catch (e) {
            throw new Error(e)
        }
    }
    async InsertLike({ userId, boardIdx, categoryMain }) {
        try {
            const result = await this.boardRepository.insertLike({ userId, boardIdx, categoryMain })
            return result
        } catch (e) {
            throw new Error(e)
        }
    }

    async FindValue({ boardIdx }) {
        try {
            const result = await this.boardRepository.findValue({ boardIdx })
            return result
        } catch (e) {
            throw new Error(e)
        }
    }

    async DeleteValue({ boardIdx }) {
        try {
            const result = await this.boardRepository.deleteValue({ boardIdx })
            return result
        } catch (e) {
            throw new Error(e)
        }
    }

}

module.exports = BoardService

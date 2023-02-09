class BoardService {
    constructor({ boardRepository, fs }) {
        this.boardRepository = boardRepository
        this.fs = fs
    }

    async RandomValue() {
        try {
            const response = await this.boardRepository.randomValue()
            return response
        } catch (e) {
            throw new Error(e)
        }
    }

    async HotValue() {
        try {
            const response = await this.boardRepository.hotValue()
            return response
        } catch (e) {
            throw new Error(e)
        }
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

    async PictureCreate({ arr, boardIdx }) {
        try {
            const arr1 = arr.map((x) => x.replace("data:image/jpeg;base64,", ""))
            const arr2 = arr1.map((x) => x.replace("data:image/png;base64,", ""))
            const arr3 = arr2.map((x) => new Buffer.from(x, "base64").toString("binary"))
            const arr4 = arr2.map(async (x, i) => {
                this.fs.writeFile(`../front/uploads/${boardIdx}_${i}.png`, x, "base64", function (e) { })
            })
            const file = await this.fs.readdir("../front/uploads")
            const boardFile = file.filter((x) => x.indexOf(`${boardIdx}`) >= 0)
            const response = await this.boardRepository.pictureCreate({ boardFile, boardIdx })
            return response
        } catch (e) {
            throw new Error(e)
        }
    }

    async CategoryValue({ categoryMain }) {
        try {
            const result = await this.boardRepository.categoryValue({ categoryMain })
            return result
        } catch (e) {
            throw new Error(e)
        }
    }

    async CategorySubValue({ categoryMain, categorySub }) {
        try {
            const result = await this.boardRepository.categorySubValue({ categoryMain, categorySub })
            return result
        } catch (e) {
            throw new Error(e)
        }
    }

    async PagingValue({ categoryMain, categorySub, pagingIndex }) {
        try {
            const result = await this.boardRepository.pagingValue({ categoryMain, categorySub, pagingIndex })
            return result
        } catch (e) {
            throw new Error(e)
        }
    }

    async FindSearch({ search }) {
        try {
            const result = await this.boardRepository.findSearch({ search })
            return result
        } catch (e) {
            throw new Error(e)
        }
    }
}

module.exports = BoardService

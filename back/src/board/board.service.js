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
        } catch (error) {}
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
    async PictureCreate({ arr }) {
        try {
            const arr1 = arr.map((x) => x.replace("data:image/jpeg;base64,", ""))
            const arr2 = arr1.map((x) => x.replace("data:image/png;base64,", ""))
            const arr3 = arr2.map((x) => new Buffer.from(x, "base64").toString("binary"))
            // const result = this.fs.writeFile(`.png`, arr2[0], "binary", function (e) {
            //     console.log(e)
            // })
            const arr4 = arr2.map((x, i) => {
                this.fs.writeFile(`uploads/${new Date().valueOf()}${i}.png`, x, "base64", function (e) {
                    console.log(e)
                })
            })
            console.log(arr2, "B. SERVI======================")
        } catch (e) {}
    }
}

module.exports = BoardService

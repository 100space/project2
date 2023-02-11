class BoardService {
    constructor({ boardRepository, fs }) {
        this.boardRepository = boardRepository
        this.fs = fs
        this.mainChange = {
            "notice": "0001",
            "community": "0002",
            "qna": "0003"
        }
        this.subChange = {
            "sub1": "0001",
            "sub2": "0002",
            "sub3": "0003"
        }
    }
    // 랜덤 값 추출 -> 인덱스 페이지
    async RandomValue() {
        try {
            const response = await this.boardRepository.randomValue()
            return response
        } catch (e) {
            throw new Error(e)
        }
    }

    // 핫 게시물
    async HotValue() {
        try {
            const response = await this.boardRepository.hotValue()
            return response
        } catch (e) {
            throw new Error(e)
        }
    }

    // 유저 정보 찾기
    async FindUserInfo({ userId }) {
        try {
            const response = await this.boardRepository.findUserInfo({ userId })
            return response
        } catch (error) { }
    }

    // 글쓰기
    async MakeWrite(payload) {
        try {
            const { subject, content, mainCd, subCd, userId, hash } = payload
            const hashValue = hash.replace("[", "").replace("]", "")
            const hashArray = hashValue.split(",")
            const mainCdValue = mainCd === "notice" ? this.mainChange.notice : mainCd === "community" ? this.mainChange.community : this.mainChange.qna
            const subCdValue = subCd === "sub1" ? this.subChange.sub1 : subCd === "sub2" ? this.subChange.sub2 : this.subChange.sub3
            const result = await this.boardRepository.createBoard({ subject, content, mainCdValue, subCdValue, hashArray, userId })
            return result
        } catch (e) {
            throw new Error(e)
        }
    }

    // 좋아요 추가하기
    async InsertLike({ userId, boardIdx, categoryMain }) {
        try {
            const result = await this.boardRepository.insertLike({ userId, boardIdx, categoryMain })
            return result
        } catch (e) {
            throw new Error(e)
        }
    }

    // 게시물 리스트 view 보기
    async FindValue({ boardIdx }) {
        try {
            const result = await this.boardRepository.findValue({ boardIdx })
            return result
        } catch (e) {
            throw new Error(e)
        }
    }

    // 게시물 삭제하기
    async DeleteValue({ boardIdx }) {
        try {
            const result = await this.boardRepository.deleteValue({ boardIdx })
            return result
        } catch (e) {
            throw new Error(e)
        }
    }

    // 사진 다듬기
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

    // 카테고리 관련 무엇
    async CategoryValue({ categoryMain, categorySub }) {
        try {
            const result = await this.boardRepository.categoryValue({ categoryMain, categorySub })
            return result

        } catch (e) {
            throw new Error(e)
        }
    }


    // 서브 카테고리로 분류하기
    async CategorySubValue({ categoryMain, categorySub }) {
        try {
            const result = await this.boardRepository.categorySubValue({ categoryMain, categorySub })
            const { response, subCount } = result

            // const response2 = response.map((x) => {
            //     x.createdAt = x.createdAt.split(0, 10)

            //     return x
            // })

            return result
        } catch (e) {
            throw new Error(e)
        }
    }


    // 페이징 값 불러오기

    async PagingValue({ categoryMain, categorySub, pagingIndex }) {
        try {
            const result = await this.boardRepository.pagingValue({ categoryMain, categorySub, pagingIndex })
            return result
        } catch (e) {
            throw new Error(e)
        }
    }

    // 검색 알고리즘
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

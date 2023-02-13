class BoardService {
    constructor({ boardRepository, fs }) {
        this.boardRepository = boardRepository
        this.fs = fs
        this.mainChange = {
            notice: "0001",
            community: "0002",
            qna: "0003",
        }
        this.subChange = {

            "sub1": "0001",
            "sub2": "0002",
            "sub3": "0003",
            "sub4": "0004",
            "sub5": "0005",
            "sub6": "0006",
            "sub7": "0007",
            "sub8": "0008",
            "sub9": "0009",
        }
    }
    // 글쓰기
    async MakeWrite(payload) {
        try {
            const { subject, content, mainCd, subCd, userId, hash } = payload
            const hashValue = JSON.parse(hash)
            const hashArray = hashValue.map((x) => x.value)
            const mainCdValue = this.mainChange[mainCd]
            const subCdValue = this.subChange[subCd]
            const result = await this.boardRepository.createBoard({ subject, content, mainCdValue, subCdValue, hashArray, userId })
            return result
        } catch (e) {
            throw new Error(e)
        }
    }

    // 게시물 리스트 view 보기
    async FindValue({ boardIdx }) {
        try {
            const result = await this.boardRepository.findValue({ boardIdx })
            const { cateCd } = result
            const mainValue = cateCd.slice(0, 4)
            const subValue = cateCd.slice(4, 8)
            const keySub = Object.keys(this.subChange)
            const sendMain = mainValue === this.mainChange.notice ? "notice" : mainValue === this.mainChange.community ? "community" : "qna"
            const sendSub = subValue === this.subChange.sub1 ? "sub1" : subValue === this.subChange.sub2 ? "sub2" : "sub3"
            result.mainCd = sendMain
            result.subCd = sendSub
            return result
        } catch (e) {
            throw new Error(e)
        }
    }

    // 게시물 수정하기
    async ChangeView(payload) {
        try {
            const { subject, content, userId, mainCd, subCd, hash, boardIdx } = payload
            const hashValue = hash.replace("[", "").replace("]", "")
            const hashArray = hashValue.split(",")
            const mainCdValue = mainCd === "notice" ? this.mainChange.notice : mainCd === "community" ? this.mainChange.community : this.mainChange.qna
            const subCdValue = subCd === "sub1" ? this.subChange.sub1 : subCd === "sub2" ? this.subChange.sub2 : this.subChange.sub3
            const result = await this.boardRepository.changeView({ subject, content, mainCdValue, subCdValue, hashArray, userId, boardIdx })
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

    // 랜덤 값 추출 -> 인덱스 페이지
    async RandomValue() {
        try {
            const response = await this.boardRepository.randomValue()
            return response
        } catch (e) {
            throw new Error(e)
        }
    }

    // 메인 카테고리 값 가져오기

    async FindMainValue({ mainCd, pageNumber }) {
        try {
            const mainCdValue = this.mainChange[mainCd]
            const result = await this.boardRepository.findMainValue({ mainCdValue, pageNumber })
            const listValue = result.findMain.map((x) => {
                const mainValue = x.cateCd.slice(0, 4)
                const subValue = x.cateCd.slice(4, 8)
                const sendMain = mainValue === this.mainChange.notice ? "notice" : mainValue === this.mainChange.community ? "community" : "qna"
                const sendSub = subValue === this.subChange.sub1 ? "sub1" : subValue === this.subChange.sub2 ? "sub2" : "sub3"
                x.mainCd = sendMain
                x.subCd = sendSub
                return x
            })
            const cateLength = {
                length: `${result.allMainCd}`,
            }
            const findSub = result.findSub.map(x => {
                const array = x.cateCd.slice(4, 8)
                return array
            })
            const subChange = Object.keys(this.subChange)
            const subCd = findSub.map(value => {
                const subValue = subChange.find(x => this.subChange[x] === value)
                return subValue
            })
            const subVal = subCd.map(x => {
                const subOb = {}
                subOb.categorySub = x
                return subOb
            })
            return { listValue, cateLength, subVal }
        } catch (e) {
            throw new Error(e)
        }
    }

    // 서브카테고리 분류
    async CategoryValue({ mainCd, subCd, pageNumber }) {
        try {
            const mainCdValue = this.mainChange[mainCd]
            const subCdValue = this.subChange[subCd]
            const findValue = `${mainCdValue}${subCdValue}`
            const result = await this.boardRepository.categoryValue({ findValue, pageNumber })
            const result2 = result.map((x, i) => {
                x.showindex = i + 1
                return x
            })
            return { listValue: result2 }
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
        } catch (error) {}
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

    // 사진 다듬기
    async PictureCreate({ arr, boardIdx }) {
        try {
            const arr1 = arr.map((x) => x.replace("data:image/jpeg;base64,", ""))
            const arr2 = arr1.map((x) => x.replace("data:image/png;base64,", ""))
            const arr3 = arr2.map((x) => new Buffer.from(x, "base64").toString("binary"))
            const arr4 = arr2.map(async (x, i) => {
                this.fs.writeFile(`../front/uploads/${boardIdx}_${i}.png`, x, "base64", function (e) {})
            })
            const file = await this.fs.readdir("../front/uploads")
            const boardFile = file.filter((x) => x.indexOf(`${boardIdx}`) >= 0)
            const response = await this.boardRepository.pictureCreate({ boardFile, boardIdx })
            return response
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

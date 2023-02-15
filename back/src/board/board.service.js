class BoardService {
    constructor({ boardRepository, fs, moment }) {
        this.boardRepository = boardRepository
        this.fs = fs
        this.mainChange = {
            notice: "0001",
            community: "0002",
            qna: "0003",
        }
        this.subChange = {
            sub1: "0001",
            sub2: "0002",
            sub3: "0003",
            sub4: "0004",
            sub5: "0005",
            sub6: "0006",
            sub7: "0007",
            sub8: "0008",
            sub9: "0009",
        }
        this.moment = moment
    }
    // 글쓰기
    async MakeWrite(payload) {
        try {
            const { subject, content, mainCd, subCd, userId, hash } = payload
            const hashArray = hash.split(",")
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
            const { cateCd } = result.response
            const mainValue = cateCd.slice(0, 4)
            const subValue = cateCd.slice(4, 8)
            const keySub = Object.keys(this.subChange)
            const sendMain = mainValue === this.mainChange.notice ? "notice" : mainValue === this.mainChange.community ? "community" : "qna"
            const sendSub = subValue === this.subChange.sub1 ? "sub1" : subValue === this.subChange.sub2 ? "sub2" : "sub3"
            result.response.mainCd = sendMain
            result.response.subCd = sendSub
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
            const { boardRandom, randomUser, randomHash } = response
            const listValue = boardRandom.map((x) => {
                const mainValue = x.cateCd.slice(0, 4)
                const sendMain = mainValue === this.mainChange.notice ? "notice" : mainValue === this.mainChange.community ? "community" : "qna"
                x.mainCd = sendMain
                return x
            })
            return { listValue, randomUser, randomHash }
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
            console.log(cateLength)
            const findSub = result.findSub.map((x) => {
                const array = x.cateCd.slice(4, 8)
                return array
            })
            const subChange = Object.keys(this.subChange)
            const subCd = findSub.map((value) => {
                const subValue = subChange.find((x) => this.subChange[x] === value)
                return subValue
            })
            const subVal = subCd.map((x) => {
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
            const result = await this.boardRepository.categoryValue({ findValue, pageNumber, mainCdValue })
            const {correctValue, subcateLength, findSub}= result
            const subArray = findSub.map(x=>x.cateCd.slice(4,8))
            const subValue = subArray.map((x,i)=>{
                switch (x) {
                    case "0001":
                        subArray[i] = "sub1"
                        break
                    case "0002":
                        subArray[i] = "sub2"
                        break
                    case "0003":
                        subArray[i] = "sub3"
                        break
                    case "0004":
                        subArray[i] = "sub4"
                        break
                    case "0005":
                        subArray[i] = "sub5"
                        break
                    case "0006":
                        subArray[i] = "sub6"
                        break
                    case "0007":
                        subArray[i] = "sub7"
                        break
                    case "0008":
                        subArray[i] = "sub8"
                        break
                    case "0009":
                        subArray[i] = "sub9"
                        break
                }
            })
            const subVal =[]
            const subValValue = subArray.map(x=>{
                const subValobj= {}
                subValobj.categorySub = x
                subVal.push(subValobj)
            })
            return { correctValue, cateLength:subcateLength, subVal }
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

    // 리스트 검색 알고리즘
    async ListValue({search, mainCd}){
        try {
            const mainCdValue = this.mainChange[mainCd]
            const result = await this.boardRepository.listValue({search, mainCdValue})
            const {subjectResponse,adminResponse} = result
            const subjectlength = subjectResponse.length
            const userlength = adminResponse.length
            result.subjectlength = subjectlength
            result.userlength = userlength
            return result
        } catch (e) {
            throw new Error(e)
        }
    }

    // 댓글 작성하기
    async PostComment({ boardIdx, cmdContent, userId }) {
        try {
            const result = await this.boardRepository.postComment({ boardIdx, cmdContent, userId })
            return result
        } catch (e) {
            throw new Error(e)
        }
    }

    // 댓글 수정하기
    async UpdateComment({ cmdIdx, cmdContent}){
        try {
            const result = await this.boardRepository.updateComment({ cmdContent,cmdIdx})
            return result
        } catch (e) {
            throw new Error(e)
        }
    }
    
    // 댓글 삭제하기
    async DropComment({cmdIdx}){
        try {
            const result = await this.boardRepository.dropComment({cmdIdx})
            return result 
        } catch (e) {
            throw new Error(e)
        }
    }
}

module.exports = BoardService

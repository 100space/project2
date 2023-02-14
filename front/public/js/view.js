const request = axios.create({
    baseURL: "http://127.0.0.1:3000",
    withCredentials: true,
})
const hidden = document.querySelector("#hidden")
const BoardIdx = document.querySelector("#boardIdx")
const mainCd = document.querySelector("#mainCd")
const content = document.querySelector("#content")
const loginUser = document.querySelector("#userId")
const writeCheckBtn = document.querySelector("#writeCheckBtn")
const viewModify = document.querySelector("#view_modify")
const commentFrm = document.querySelector("#comment-form")
const contentValue = hidden.value
content.innerHTML = `${contentValue}`
let img = document.querySelectorAll("#content img[src]")
const boardIdx = BoardIdx.value

const modifyBtnHandler = async (e) => {
    if (e.target.className.indexOf("modify") >= 0) {
        location.href = `/board/${mainCd.value}/view/${boardIdx}/modify`
    }
}

const commentFrmHandler = async (e) => {
    e.preventDefault()
    if (e.target.localName === "button") {
        const inputValue = commentFrm.children[0].value
        const userId = loginUser.value
        const result = await request.post(`/board/comment/${boardIdx}`, { cmdContent: inputValue, userId })
        console.log(result, "view.js / comment")
        //result 를 innerHTML / template로 작성
    }
}
const arr = []
for (let i = 0; i < img.length; i++) {
    arr.push(img[i].currentSrc)
}

viewModify.addEventListener("click", modifyBtnHandler)
commentFrm.addEventListener("click", commentFrmHandler)
;(async () => {
    const response = await request.post("/board/picture", { arr, boardIdx })
    // console.log(response)
})()

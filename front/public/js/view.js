const request = axios.create({
    baseURL: "http://127.0.0.1:3000",
    withCredentials: true,
})
const hidden = document.querySelector("#hidden")
const BoardIdx = document.querySelector("#boardIdx")
const mainCd = document.querySelector("#mainCd")
const content = document.querySelector("#content")
const writeCheckBtn = document.querySelector("#writeCheckBtn")
const viewModify = document.querySelector("#view_modify")
const contentValue = hidden.value
content.innerHTML = `${contentValue}`
let img = document.querySelectorAll("#content img[src]")

const modifyBtnHandler = async (e) => {
    if (e.target.className.indexOf("modify") >= 0) {
        location.href = `/board/${mainCd.value}/view/${BoardIdx.value}/modify`
    }
}
viewModify.addEventListener("click", modifyBtnHandler)

const arr = []
for (let i = 0; i < img.length; i++) {
    // console.log(img[i].currentSrc)
    arr.push(img[i].currentSrc)
}
const boardIdx = BoardIdx.value

;(async () => {
    const response = await request.post("/board/picture", { arr, boardIdx })
    // console.log(response)
})()

const request = axios.create({
    baseURL: "http://127.0.0.1:3000",
    withCredentials: true,
})
const hidden = document.querySelector("#hidden")
const BoardIdx = document.querySelector("#boardIdx")
const content = document.querySelector("#content")
const writeCheckBtn = document.querySelector("#writeCheckBtn")
const contentValue = hidden.value
content.innerHTML = `${contentValue}`
let img = document.querySelectorAll("#content img[src]")

const updatedTime = document.querySelector("#updatedTime")
console.log(updatedTime.innerHTML)

const arr = []
for (let i = 0; i < img.length; i++) {
    // console.log(img[i].currentSrc)
    arr.push(img[i].currentSrc)
}
const boardIdx = BoardIdx.value

writeCheckBtn.addEventListener("click", (e) => {
    const _pathname = location.pathname.slice(6)
    location.href = `${_pathname}`
})
;(async () => {
    const response = await request.post("/board/picture", { arr, boardIdx })
    console.log(response)
})()

// if(img.)

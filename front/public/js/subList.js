let pathname = location.pathname
const contentSub = document.querySelector("#contentSub")
const boardHeader = document.querySelector("#boardHeader")
const writeBtn = document.querySelector("#writeBtn")
const hidden = document.querySelector("#hidden")
const prev = document.querySelector("#prev")
const next = document.querySelector("#next")
const pageNum = document.querySelector("#pageNum")


let pathname2 = pathname.substring(0, 7)


let pathname3 = pathname2 === "/notice" ? "공지사항" : pathname2 === "/commun" ? "커뮤니티" : pathname2 === "/user/m" ? "내가 쓴 글" : "질문과 답변"

boardHeader.innerHTML = `<div>${pathname3}</div>
    <div>${pathname.slice(1).replace(/^[a-z]/, (char) => char.toUpperCase())}</div>`

const writeBtnHandler = (e) => {
    e.preventDefault()
    const writePath = location.pathname.slice(1)
    location.href = `/write/${writePath}`
}
writeBtn.addEventListener("click", writeBtnHandler)

let boardCount = hidden.value
let pageBlock = 1

const page = Math.ceil(boardCount / 5)
const maxPageBlock = Math.ceil(page / 5)

for (let i = 5 * pageBlock - 4; i <= 5 * pageBlock; i++) {
    if (i < page) {
        console.log(i)
        const tag = document.createElement("a")
        tag.innerHTML = `${i}`
        tag.setAttribute("href", `${location.pathname}/${i}`)
        pageNum.append(tag)
    }
}

prev.addEventListener("click", () => {
    if (pageBlock > 1) {
        pageBlock--
        pageNum.innerHTML = ""
        for (let i = 5 * pageBlock - 4; i <= 5 * pageBlock; i++) {
            if (i > 0) {
                console.log(i)
                const tag = document.createElement("a")
                tag.innerHTML = `${i}`
                tag.setAttribute("href", `${location.pathname}/${i}`)
                pageNum.append(tag)
            }
        }
    }
})
next.addEventListener("click", () => {
    if (pageBlock < maxPageBlock) {
        pageBlock++
        pageNum.innerHTML = ""
        for (let i = 5 * pageBlock - 4; i <= 5 * pageBlock; i++) {
            if (i <= page) {
                console.log(i)
                const tag = document.createElement("a")
                tag.innerHTML = `${i}`
                tag.setAttribute("href", `${location.pathname}/${i}`)
                pageNum.append(tag)
            }
        }
    }
})

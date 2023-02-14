let pathname = location.pathname
const contentSub = document.querySelector("#contentSub")
const boardHeader = document.querySelector("#boardHeader")
const boardHeaderA = document.querySelector("#boardHeader > a")
const writeBtn = document.querySelector("#writeBtn")
const hidden = document.querySelector("#hidden")
const prev = document.querySelector("#prev")
const next = document.querySelector("#next")
const pageNum = document.querySelector("#pageNum")
const pagePath = boardHeaderA.attributes.href.nodeValue
let pathname2 = pagePath.replace("/board", "")
console.log(pathname2)
let pathname3 = pathname2 === "/notice?page=1" ? "공지사항" : pathname2 === "/community?page=1" ? "커뮤니티" : "질문과 답변"

boardHeaderA.innerHTML = `${pathname3}`
// <div>${pathname.slice(1).replace(/^[a-z]/, (char) => char.toUpperCase())}</div>`

const searchParams = location.search
const nowPage = new URLSearchParams(searchParams).get("page")
console.log(nowPage)
let boardCount = hidden.value
console.log(boardCount)
const checkNum = 5 * nowPage - 4
let pageBlock = Math.ceil(nowPage / 5)
const page = Math.ceil(boardCount / 5)
const maxPageBlock = Math.ceil(page / 5)
console.log(pathname)
for (let i = 5 * pageBlock - 4; i <= 5 * pageBlock; i++) {
    if (i <= page) {
        console.log(i)
        const tag = document.createElement("a")
        tag.innerHTML = `${i}`
        tag.setAttribute("href", `${pagePath}?page=${i}`)
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
                tag.setAttribute("href", `${pagePath}/${i}`)
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
                tag.setAttribute("href", `${pagePath}/${i}`)
                pageNum.append(tag)
            }
        }
    }
})

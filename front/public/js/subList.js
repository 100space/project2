let pathname = location.pathname
const contentSub = document.querySelector("#contentSub")
const boardHeader = document.querySelector("#boardHeader")
const writeBtn = document.querySelector("#writeBtn")
const boardCount = document.querySelector("#boardCount")
const prev = document.querySelector("#prev")
const next = document.querySelector("#next")
const pageNum = document.querySelector("#pageNum")

let pathname2 = pathname === "/notice" ? "공지사항" : pathname === "/community" ? "커뮤니티" : "질문과 답변"

boardHeader.innerHTML = `<div>${pathname2}</div>
<div>${pathname.slice(1).replace(/^[a-z]/, (char) => char.toUpperCase())}</div>`

const writeBtnHandler = (e) => {
    e.preventDefault()
    const writePath = location.pathname.slice(1)
    location.href = `/write/${writePath}`
}
writeBtn.addEventListener("click", writeBtnHandler)

const page = Math.floor(boardCount.value / 5) + 1
console.log(page)
let pageBlock = 1
console.log(pageBlock)
for (let i = 5 * pageBlock - 4; i <= 5 * pageBlock; i++) {
    console.log(i)
    const a = document.createElement("a")
    pageNum.append(a)
    a.setAttribute("href", `/{{mainVal}}/{{categorySub}}/${i}`)
    a.innerHTML = `${i}`
}
prev.addEventListener("click", () => {
    pageBlock--
    console.log(pageBlock)
    for (let i = 5 * pageBlock - 4; i <= 5 * pageBlock; i++) {
        a.setAttribute("href", `/{{mainVal}}/{{categorySub}}/${i}`)
        a.innerHTML = `${i}`
    }
})
// for (let i = 5 * pageBlock - 4; i < page; i++) {
//     console.log(i)
// }

next.addEventListener("click", () => {
    pageBlock++
    console.log(pageBlock)
    for (let i = 5 * pageBlock - 4; i <= 5 * pageBlock; i++) {
        console.log(i)
        a.setAttribute("href", `/{{mainVal}}/{{categorySub}}/${i}`)
        a.innerHTML = `${i}`
    }
})

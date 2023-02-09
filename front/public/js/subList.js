let pathname = location.pathname
const contentSub = document.querySelector("#contentSub")
const boardHeader = document.querySelector("#boardHeader")
const writeBtn = document.querySelector("#writeBtn")

let pathname2 = pathname.substring(0, 7)
let pathname3 = pathname2 === "/notice" ? "공지사항" : pathname2 === "/commun" ? "커뮤니티" : "질문과 답변"

boardHeader.innerHTML = `<div>${pathname3}</div>
    <div>${pathname.slice(1).replace(/^[a-z]/, (char) => char.toUpperCase())}</div>`

const writeBtnHandler = (e) => {
    e.preventDefault()
    const writePath = location.pathname.slice(1)
    location.href = `/write/${writePath}`
}
writeBtn.addEventListener("click", writeBtnHandler)

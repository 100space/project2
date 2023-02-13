let pathname = location.pathname
const contentSub = document.querySelector("#contentSub")
const boardHeader = document.querySelector("#boardHeader")
const writeBtn = document.querySelector("#writeBtn")
console.log(pathname)

let pathname2 = pathname === "/notice" ? "공지사항" : pathname === "/community" ? "커뮤니티" : "질문과 답변"

boardHeader.innerHTML = `<div>${pathname2}</div>
    <div>${pathname.slice(1).replace(/^[a-z]/, (char) => char.toUpperCase())}</div>`

const writeBtnHandler = (e) => {
    e.preventDefault()
    const writePath = location.pathname.slice(1)
    location.href = `/write/${writePath}`
}
writeBtn.addEventListener("click", writeBtnHandler)

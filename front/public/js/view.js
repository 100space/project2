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
const commentContent = document.querySelectorAll(".comment")
const commentList = document.querySelector("#commentList")
const commentModify = document.querySelectorAll(".comment_modify")
const commentCount = document.querySelector("#commentHeader > span:nth-child(2)")
const liked = document.querySelector("#liked")
const contentValue = hidden.value
content.innerHTML = `${contentValue}`
let img = document.querySelectorAll("#content img[src]")
const boardIdx = BoardIdx.value

const modifyBtnHandler = async (e) => {
    if (e.target.className.indexOf("modify") >= 0) {
        location.href = `/board/${mainCd.value}/view/${boardIdx}/modify`
    } else {
        confirm("삭제하시겠습니까?")
        console.log(mainCd.value, boardIdx)
        const response = await request.delete(`/board/${mainCd.value}/view/${boardIdx}`)
        location.href = `/board/${mainCd.value}?page=1`
    }
}
const likedHandler = (e) => {
    console.dir(liked.children[0])
    liked.children[0].classList.toggle("likedImgClick")
}



const commentFrmHandler = async (e) => {
    e.preventDefault()

    const inputValue = commentFrm.children[0].value
    console.log(inputValue, "=====================")
    if (inputValue) {
        if (e.target.localName === "button") {
            const userId = loginUser.value
            const result = await request.post(`/board/comment/${boardIdx}`, { cmdContent: inputValue, userId })
            const { response, count } = result.data
            const commentItem = document.createElement("div")
            commentItem.classList.add("commentItem")
            commentList.prepend(commentItem)
            commentItem.innerHTML = `<div class="item_Header flex">
                        <div>
                            <span class="item_Header_writer">${response.userId}</span>
                            <span class="item_Header_date">${response.createdAt}</span>
                        </div>
                        <div class="comment_controll">
                            <span class="comment_modify item_Header_date" id="comment_update" style="color:#444444">수정</span>
                            <span class="comment_delete item_Header_date"><a href=/board/${mainCd.value}/comment/${response.cmdIdx}>삭제</a></span>
                        </div>
                    </div>
                    <div class="comment">${response.cmdContent}</div>`
        //result 를 innerHTML / template로 작성
        const commentUpdate = document.querySelector("#comment_update")
        commentUpdate.addEventListener("click", async (e)=>{
            commentItem.removeChild(commentItem.lastChild)
            let form = document.createElement("form")
            form.setAttribute("charset","UTF-8")
            form.setAttribute("method","post")
            form.setAttribute("action",`/board/${mainCd.value}/comment/${response.cmdIdx}`)
            form.id = "commentUpdateFrm"

            let input = document.createElement("input")
            input.type = "text"
            input.name ="cmdContent"
            
            let button = document.createElement("button")
            button.type = "submit"
            button.innerHTML = "수정 완료"

            form.appendChild(input)
            form.appendChild(button)
            commentItem.append(form)

            const commentUpdateFrm = document.querySelector("#commentUpdateFrm")

        })
        commentCount.innerHTML = ` ${count}개`
        
        commentFrm.focus()
        commentFrm.reset()

        }
    }
}
const commentModifyHandler = (e) => {
    console.log(e.target)
    for (let i = 0; i < commentContent.length; i++) {
        commentContent[i].innerHTML = `<input type="text" class="commentContent" value="${commentContent[i].innerHTML}">`
    }
}
const arr = []
for (let i = 0; i < img.length; i++) {
    arr.push(img[i].currentSrc)
}
;(async () => {
    const response = await request.post("/board/picture", { arr, boardIdx })
    // console.log(response)
})()
liked.addEventListener("click", likedHandler)
commentFrm.addEventListener("click", commentFrmHandler)
console.log(commentModify.length)
for (let i = 0; i < commentModify.length; i++) {
    commentModify[i].addEventListener("click", commentModifyHandler, { once: true })
}
viewModify.addEventListener("click", modifyBtnHandler)

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
const commentControll = document.querySelectorAll(".comment_controll")
const commentCount = document.querySelector("#commentHeader > span:nth-child(2)")
const cmdIdxz = document.querySelectorAll("#cmdIdx")
const liked = document.querySelector("#liked")
const backBtn = document.querySelector(".backBtn")
const contentValue = hidden.value
content.innerHTML = `${contentValue}`
let img = document.querySelectorAll("#content img[src]")
const boardIdx = BoardIdx.value
const userId = loginUser.value

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
const likedHandler = async (e) => {
    console.dir(liked.children[0])
    const result = await request.post(`/board/${mainCd.value}/view/${boardIdx}/like`, { userId: `${userId}` })
    liked.children[1].innerHTML = `추천수 : ${result.data.length}`
    liked.children[0].classList.toggle("likedImgClick")
    //
}
const backBtnHandler = () => {
    location.href = document.referrer
}
const commentFrmHandler = async (e) => {
    e.preventDefault()

    const inputValue = commentFrm.children[0].value
    console.log(inputValue, "=====================")
    if (inputValue) {
        if (e.target.localName === "button") {
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
                            <span class="comment_modify item_Header_date" id="comment_update" style="color:#808080">수정</span>
                            <span class="comment_delete item_Header_date"><a href=/board/${mainCd.value}/comment/${response.cmdIdx}>삭제</a></span>
                        </div>
                    </div>
                    <div class="comment">${response.cmdContent}</div>`
            //result 를 innerHTML / template로 작성
            const commentUpdate = document.querySelector("#comment_update")
            commentUpdate.addEventListener("click", async (e) => {
                commentItem.removeChild(commentItem.lastChild)
                let form = document.createElement("form")
                form.setAttribute("charset", "UTF-8")
                form.setAttribute("method", "post")
                form.setAttribute("action", `/board/${mainCd.value}/comment/${response.cmdIdx}`)
                form.id = "commentUpdateFrm"

                let input = document.createElement("input")
                input.type = "text"
                input.name = "cmdContent"

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
const arr = []
for (let i = 0; i < img.length; i++) {
    arr.push(img[i].currentSrc)
}
;(async () => {
    const response = await request.post("/board/picture", { arr, boardIdx })
    // console.log(response)
})()

liked.addEventListener("click", likedHandler)
backBtn.addEventListener("click", backBtnHandler)
for (let i = 0; i < commentControll.length; i++) {
    commentControll[i].addEventListener(
        "click",
        (e) => {
            if (e.target.classList[0] === "comment_modify") {
                commentContent[i].innerHTML = `<input type="text" class="commentContent" placeholder="${commentContent[i].innerHTML}">`
                const modifyContent = document.querySelector(".commentContent")
                console.log(mainCd.value)
                modifyContent.addEventListener("keyup", async (e) => {
                    if (e.keyCode === 13) {
                        const cmdContent = modifyContent.value
                        const modifyValue = await request.put(`/board/comment/${cmdIdxz[i].value}`, { cmdContent: `${cmdContent}` })
                        commentContent[i].innerHTML = `${cmdContent}`
                    }
                })
            }
        },
        { once: true }
    )
}
commentFrm.addEventListener("click", commentFrmHandler)
viewModify.addEventListener("click", modifyBtnHandler)

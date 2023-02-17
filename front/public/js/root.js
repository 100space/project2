import request from "/js/lib/request.js"
const nav = document.querySelector("#nav")
const gnb = document.querySelector("#gnb")
const arrow = document.querySelector("#nav > img")
const userInfo = document.querySelector("#userInfo")
const infoGnb = document.querySelector("#infoGnb")
const search = document.querySelector("#search")
const searchBtn = document.querySelector("#searchBtn")
const chatIcon = document.querySelector("#chatIcon")
const chatWindow = document.querySelector("#chatWindow")
const closeBtn = document.querySelector("#closeBtn")
const chat = document.querySelector("#chat")
const frm = document.querySelector("#frm")
const card = document.querySelectorAll(".flexCard > div")
const socket = io.connect("http://13.209.76.244:3000", {
    path: "/socket.io",
    transports: ["websocket"],
})
const notify = io.connect(`http://13.209.76.244:3000/notify`, {
    path: "/socket.io",
    transports: ["websocket"],
})

const cardHandler = (e) => {
    setTimeout(function () {
        for (let i = 0; i < card.length; i++) {
            console.log(card[`${i}`].style)
            card[`${i}`].style.transform = "rotate(0deg)"
            card[`${i}`].style.transition = "all 2s"
            setTimeout(() => (card[2].style.bottom = "0"), 200)
            setTimeout(() => {
                card[5].style.right = "0"
                card[5].style.bottom = "0"
            }, 700)
            setTimeout(() => {
                card[3].style.bottom = "0"
                card[3].style.right = "0"
            }, 300)
            setTimeout(() => {
                card[1].style.bottom = "0"
                card[1].style.right = "0"
                card[1].style.transition = "all 1s"
            }, 500)
        }
    }, 1500)
}
const navfunction = (e) => {
    gnb.classList.toggle("off")
    arrow.classList.toggle("deg")
    arrow.classList.toggle("deg2")
}
const gnbfunction = async (e) => {
    e.preventDefault()
    gnb.classList.toggle("off")
    arrow.classList.toggle("deg")
    arrow.classList.toggle("deg2")
    const response = await request.get(e.target.pathname)
    location.href = `http://13.209.76.244:3005${e.target.pathname}`
    console.log(response)
}
const userInfoClick = (e) => {
    console.log(infoGnb.classList.toString())
    infoGnb.classList.toggle("off2")
}
const logoutFunction = (e) => {
    e.preventDefault()
    document.cookie = "token=; path=/; expires=Thum 01 Jan 1970 00:00:01 GMT"
    location.href = "/"
}
const searchFunction = (e) => {
    search.classList.toggle("off3")
}

const chatHandler = (e) => {
    chatWindow.classList.toggle("open")
    chatWindow.classList.toggle("close")
    chat.scrollTop = chat.scrollHeight
}
const chatCHandler = (e) => {
    chatWindow.classList.toggle("open")
    chatWindow.classList.toggle("close")
    chat.scrollTop = chat.scrollHeight
}
export function a(a, b) {
    return a + b
}
const chatSubmitHandler = (e) => {
    e.preventDefault()
    const { message, nickName } = e.target
    const data = message.value
    const userNick = nickName.value
    if (data === "") {
        alert("메세지 내용이 없습니다")
    } else {
        const li = document.createElement("li")
        li.classList.add("right")
        li.innerHTML = `<span class="flex-center"> ${data} </span>`
        chat.append(li)
        chat.scrollTop = chat.scrollHeight
        socket.emit("data", { data, userNick })
        e.target.reset()
        message.focus()
    }
}

socket.on("reply", (data1) => {
    const json = JSON.parse(data1)
    const { chunk, data } = json
    const li = document.createElement("li")
    li.classList.add("left")
    li.innerHTML = `<p >${chunk}</p>
    <span class="flex-center reply"><p>${data}</p></span>`
    chat.append(li)
    chat.scrollTop = chat.scrollHeight
})

notify.on("notify", (dataz) => {
    const json = JSON.parse(dataz)
    console.log(json)
    socket.join()

    socket.emit(dataz)
})
nav.addEventListener("click", navfunction)
gnb.addEventListener("click", gnbfunction)
window.addEventListener("load", cardHandler)
userInfo.addEventListener("click", userInfoClick)
searchBtn.addEventListener("click", searchFunction)
chatIcon.addEventListener("click", chatHandler)
closeBtn.addEventListener("click", chatCHandler)
frm.addEventListener("submit", chatSubmitHandler)
const logout = document.querySelector("#logout")
logout.addEventListener("click", logoutFunction)

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
const socket = io.connect("http://127.0.0.1:3000", {
    path: "/socket.io",
    transports: ["websocket"],
})

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
    location.href = `http://127.0.0.1:3005${e.target.pathname}`
    console.log(response)
}
const userInfoClick = (e) => {
    console.log(infoGnb.classList.toString())
    infoGnb.classList.toggle("off2")
}
const logoutFunction = (e) => {
    e.preventDefault()
    document.cookie = "token=; expires=Thum 01 Jan 1970 00:00:01 GMT"
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
const chatSubmitHandler = (e) => {
    e.preventDefault()
    const { message, nickName } = e.target
    const data = message.value
    const userNick = nickName.value
    const li = document.createElement("li")
    li.classList.add("right")
    li.innerHTML = `<span class="flex-center"> ${message.value} </span>`
    chat.append(li)
    chat.scrollTop = chat.scrollHeight
    socket.emit("data", { data, userNick })
    e.target.reset()
    message.focus()
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

nav.addEventListener("click", navfunction)
gnb.addEventListener("click", gnbfunction)
userInfo.addEventListener("click", userInfoClick)
searchBtn.addEventListener("click", searchFunction)
// search.addEventListener("keypress", searchEvent)
chatIcon.addEventListener("click", chatHandler)
closeBtn.addEventListener("click", chatCHandler)
frm.addEventListener("submit", chatSubmitHandler)
const logout = document.querySelector("#logout")
logout.addEventListener("click", logoutFunction)

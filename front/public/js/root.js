import request from "/js/lib/request.js"
const nav = document.querySelector("#nav")
const gnb = document.querySelector("#gnb")
const arrow = document.querySelector("#nav > img")
const userInfo = document.querySelector("#userInfo")
const infoGnb = document.querySelector("#infoGnb")
const logout = document.querySelector("#logout")
const search = document.querySelector("#search")
const searchBtn = document.querySelector("#searchBtn")

console.log(request)

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
    console.log(e.target)
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

nav.addEventListener("click", navfunction)
gnb.addEventListener("click", gnbfunction)
userInfo.addEventListener("click", userInfoClick)
logout.addEventListener("click", logoutFunction)
searchBtn.addEventListener("click", searchFunction)

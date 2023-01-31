import request from "/js/lib/request.js"
const nav = document.querySelector("#nav")
const gnb = document.querySelector("#gnb")
const arrow = document.querySelector("#nav > img")

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

nav.addEventListener("click", navfunction)
gnb.addEventListener("click", gnbfunction)

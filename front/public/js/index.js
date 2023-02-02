const cardHeader = document.querySelectorAll(".cardHeader")
const cardBox = document.querySelectorAll(".content_box")
const contentCard = document.querySelectorAll(".contentCard")
const contentImg = document.querySelectorAll(".cardBody > img")
const a = document.querySelector("#a")
const cardSubject = document.querySelectorAll(".cardSubject > span")
const textSub = document.querySelectorAll(".textSub")

for (let i = 0; i < cardHeader.length; i++) {
    cardHeader[i].addEventListener("click", (e) => {
        // console.log(e.target)
        cardBox[i].classList.toggle("clickEvent")
    })
    contentImg[i].addEventListener("click", (e) => {
        location.href = "/community"
    })
    cardSubject[i].addEventListener("click", (e) => {
        location.href = "/community"
    })
    textSub[i].addEventListener("click", (e) => {
        location.href = "/community"
    })
}

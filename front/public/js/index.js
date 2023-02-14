const cardHeader = document.querySelectorAll(".cardHeader")
const cardBox = document.querySelectorAll(".content_box")
const contentCard = document.querySelectorAll(".contentCard")
const contentImg = document.querySelectorAll(".cardBody > img")
const a = document.querySelector("#a")
const cardSubject = document.querySelectorAll(".cardSubject > span")
const textSub = document.querySelectorAll(".textSub")
const indexBoardIdx = document.querySelectorAll("#indexBoardIdx")

let arr = []
let arr1 = []
for (let i = 0; i < indexBoardIdx.length; i++) {
    const arr2 = indexBoardIdx[i].value.split(",")[0]
    const arr3 = indexBoardIdx[i].value.split(",")[1]
    arr.push(arr2)
    arr1.push(arr3)
}
console.log(arr)
console.log(arr1)

for (let i = 0; i < cardHeader.length; i++) {
    cardHeader[i].addEventListener("click", (e) => {
        // console.log(e.target)
        cardBox[i].classList.toggle("clickEvent")
    })
    contentImg[i].addEventListener("click", (e) => {
        location.href = `/board/${arr[i]}/view/${arr1[i]}`
    })
    cardSubject[i].addEventListener("click", (e) => {
        location.href = `/board/${arr[i]}/view/${arr1[i]}`
    })
    textSub[i].addEventListener("click", (e) => {
        location.href = `/board/${arr[i]}/view/${arr1[i]}`
    })
}

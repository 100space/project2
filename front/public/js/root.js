const nav = document.querySelector("#nav")
const gnb = document.querySelector("#gnb")

nav.addEventListener("click", (e) => {
    gnb.classList.toggle("off")
})

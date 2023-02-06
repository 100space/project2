const request = axios.create({
    baseURL: "http://127.0.0.1:3000",
    withCredentials: true,
})
const modifyBtn = document.querySelector("#modifyBtn")
const submitBtn = document.querySelector("#submitBtn")
const userId = document.querySelector(".userId").innerHTML
const input = document.querySelectorAll("input")

const modifyHandler = async (e) => {
    location.href = `http://127.0.0.1:3005/profile/modify/${userId}`
    console.log(response)
}
console.log(input)
// const submitHandler = async (e) => {
//     e.perventDefault()
//     console.log(e.target)
// }
modifyBtn.addEventListener("click", modifyHandler)
// submitBtn.addEventListener("submit", submitHandler)

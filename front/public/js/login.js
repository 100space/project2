const request = axios.create({
    baseURL: "http://127.0.0.1:3000",
    withCredentials: true,
})

const signUpButton = document.getElementById("signUp")
const signInButton = document.getElementById("signIn")
const container = document.getElementById("container")
const input = document.querySelector("#userinfo > label > input")

signUpButton.addEventListener("click", () => container.classList.add("right-panel-active"))
signInButton.addEventListener("click", () => container.classList.remove("right-panel-active"))

const idCheck = async (e) => {
    let inputTag = e.target
    console.dir(e.target)
    if (inputTag.name === "userId") {
        const response = await request.get(`/check/?${inputTag.name}=${inputTag.value}`)
    }
    if (inputTag.name === "nickName") {
        const response = await request.get(`/check/?${inputTag.name}=${inputTag.value}`)
    }
}
input.addEventListener("input", idCheck)
